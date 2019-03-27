// React Imports
import React from 'react';
// Redux impots
import { connect } from 'react-redux'
// Style Imports
import Style from './log.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import { UnexpectedPlatformError } from '../../_helpers/errors';


class Log extends React.Component {

    constructor(props) {
        super(props)
    }

    getDisplayDate = () => {
        if (this.props.activeDate) {
            // Format date string for display
            var dateString = `${this.props.activeDate.getDate()}-${this.props.activeDate.getMonth()}-${this.props.activeDate.getFullYear()}`
            // Display today for current date
            var currentDate = (new Date).setHours(0,0,0,0)
            var activeDate = (new Date(this.props.activeDate)).setHours(0,0,0,0)
            if (currentDate === activeDate) { return `Today (${dateString})` } 
            else { return dateString }
        }
    }


    singleLogView = (props) => (
        <div className={Style.singleLogView}>
            <div className={Style.logDate}>  
                <h4>{this.getDisplayDate()}</h4>
            </div>
    
            <div className={Style.logMain}>
                {props.children}
            </div>
        </div>
    )

    render() {
        const nextEnabled = !(this.props.activeDate < this.props.endDate)
        const prevEnabled = !(this.props.activeDate > this.props.startDate)

        if (this.props.platform === "DESKTOP") {
            const LogView = this.singleLogView
            return (
                <div className={Style.log}>
                    <div className={Style.logActions}>
                        <button className={ButtonStyle.buttonSM} onClick={this.props.onPrev} disabled={prevEnabled}>
                            <i className="fa fa-arrow-left"></i> Previous
                        </button>

                        <button className={ButtonStyle.buttonSM} onClick={this.props.onNext} disabled={nextEnabled}>
                            Next <i className="fa fa-arrow-right"></i>
                        </button>
                    </div>

                    <LogView>{this.props.entries}{this.props.children}</LogView>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div className={Style.mobileLogView}>

                    <div className={Style.viewOptions}>
                        <button className={ButtonStyle.buttonXS} onClick={this.props.onPrev} disabled={prevEnabled}>
                            <i className="fa fa-arrow-left"></i> Previous
                        </button>
                        <button className={ButtonStyle.buttonXS} onClick={this.props.onNext} disabled={nextEnabled}>
                            Next <i className="fa fa-arrow-right"></i>
                        </button>
                    </div>

                    <div className={Style.logView}>
                        <div className={Style.logDate}><h5>{this.getDisplayDate()}</h5></div>
                        <div className={Style.logMain}>{this.props.entries}{this.props.children}</div>
                    </div>
                </div>
            )
        }
        else {
            throw new UnexpectedPlatformError(this.props.platform, this.constructor.name)
        }
    }
}

const mapStateToProps = (state) => ({
    platform: state.app.platform
})

export default connect(mapStateToProps)(Log)
