// React Imports
import React from 'react';
// Redux impots
import { connect } from 'react-redux'
// Style Imports
import Style from './log.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import { UnexpectedPlatformError } from '../../_helpers/errors';


class Log extends React.Component {

    MobileLogView = (props) => (
        <div className={Style.mobileLogView}>

            <div className={Style.viewOptions}>
                <button className={ButtonStyle.buttonXS}><i className="fa fa-arrow-left"></i> Previous</button>
                <button className={ButtonStyle.buttonXS}>Next <i className="fa fa-arrow-right"></i></button>
            </div>

            <div className={Style.logView}>
                <div className={Style.logDate}>
                    <h5>10/05/2019</h5>
                </div>

                <div className={Style.logMain}>
                    {props.children}
                </div>
            </div>
        </div>
    )

    singleLogView = (props) => (
        <div className={Style.singleLogView}>
            <div className={Style.logDate}>
                <div className={Style.prev}>
                    <i className="fa fa-chevron-left"></i>
                    <i className="fa fa-chevron-left"></i>
                </div>
                
                <h4>10/05/2019</h4>

                <div className={Style.next}>
                    <i className="fa fa-chevron-right"></i>
                    <i className="fa fa-chevron-right"></i>
                </div>
            </div>
    
            <div className={Style.logMain}>
                {props.children}
            </div>
        </div>
    )

    render() {
        if (this.props.platform === "DESKTOP") {
            const LogView = this.singleLogView
            return (
                <div className={Style.log}>
                    <div className={Style.logActions}>
                        <div className={Style.displayOptions}>
                            <button className={ButtonStyle.buttonXS}><i className="fa fa-calendar-day"></i></button>
                            <button className={ButtonStyle.buttonXS}><i className="fa fa-calendar-week"></i></button>
                        </div>
                    </div>

                    <LogView>{this.props.children}</LogView>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (<this.MobileLogView>{this.props.children}</this.MobileLogView>)
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
