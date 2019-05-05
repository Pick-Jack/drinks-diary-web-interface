// React Imports
import React from 'react';
// Redux impots
import { connect } from 'react-redux'
// Style Imports
import Style from './log.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import { UnexpectedPlatformError } from '../../_helpers/errors';
import * as Moment from 'moment';

class Log extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            prevEnabled: false,
            nextEnabled: false,
            displayedDatetime: undefined,
            displayedEntries: undefined
        }
    }

    componentDidMount() {
        if (!this.state.displayedDatetime) {
            this.updateLogState("initialise")
        }
    }

    updateLogState = (action) => {
        const startDatetime = new Moment(this.props.startDate)
        const endDatetime = new Moment(this.props.endDate)

        // Set the datetime to display in the view
        var newDisplayDatetime;
        switch(action) {
            case "initialise":
                if (new Moment().isBetween(startDatetime, endDatetime)) { newDisplayDatetime = new Moment() } 
                else { newDisplayDatetime = endDatetime }
                break;
            case "next":
                newDisplayDatetime = this.state.displayedDatetime.add(1, 'days')
                break;
            case "previous":
                newDisplayDatetime = this.state.displayedDatetime.subtract(1, 'days')
                break;
            default:
                throw new Error("Unexpected action to process while updating Log state")
        }

        // Update page button states
        const nextEnabled = (new Moment(newDisplayDatetime).isBefore(endDatetime))
        const prevEnabled = (new Moment(newDisplayDatetime).subtract(1, "days").isAfter(startDatetime))

        // Retrieve the entries to display
        const entries = this.props.entryFunc(newDisplayDatetime.toDate())

        this.setState({nextEnabled, prevEnabled, displayedDatetime: newDisplayDatetime, displayedEntries: entries})
    }

    render() {
        // If the dispalyed datetime has not been defined, return nothing
        // the lifecycle function componentDidMount will then initialise
        // the value.
        if (!this.state.displayedDatetime) { return (<div></div>) }

        if (this.props.platform === "DESKTOP") {
            return (
                <div className={Style.log}>
                    <div className={Style.logActions}>
                        <button className={ButtonStyle.buttonSM} onClick={() => this.updateLogState("previous")} disabled={!this.state.prevEnabled}>
                            <i className="fa fa-arrow-left"></i> Previous </button>

                        <button className={ButtonStyle.buttonSM} onClick={() => this.updateLogState("next")} disabled={!this.state.nextEnabled}>
                            Next <i className="fa fa-arrow-right"></i> </button>
                    </div>

                    <div className={Style.logDate}>
                        <h4>{ this.state.displayedDatetime.format("DD-MM-YYYY") == Moment().format("DD-MM-YYYY") ? 
                        `Today (${this.state.displayedDatetime.format("DD-MM-YYYY")})` :
                        this.state.displayedDatetime.format("DD-MM-YYYY") }</h4>
                    </div>
                
                    {!this.state.displayedDatetime.isAfter(new Moment()) ? 
                    (<div className={Style.logMain}>{this.state.displayedEntries}{this.props.children}</div>) :
                    (<div className={Style.futureEntry}>
                        <div className={Style.message}>
                            <h3><i className="fa fa-calendar-times"></i> Not quite yet...</h3>
                            <h5>You can create an entry on this date when we get there.</h5>
                        </div>
                    </div>)}
                     
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            const nextEnabled = !(this.props.activeDate < this.props.endDate)
            const prevEnabled = !(this.props.activeDate > this.props.startDate)

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
