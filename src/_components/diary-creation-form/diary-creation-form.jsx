// React imports
import React from 'react';
// Router imports 
import { withRouter, Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
import { OptionTypes, MessageTypes } from '../../_helpers/enums';
import { flashMessage } from '../../_redux/actions/message-flash.actions'
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions';
// API function imports
import { createDiary } from '../../_services/diary.service';
// Style imports
import Style from './diary-creation-form.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../_helpers/style-utility/form-control.module.scss';
import { EventEmitter } from 'events';
import { UnexpectedPlatformError, ValidationException } from '../../_helpers/errors';



class DiaryCreationForm extends React.Component {

    constructor(props) {
        super(props)

        // Set back location option
        this.props.setBackOption('/', OptionTypes.back)

        this.state = {
            values: {
                enrolmentOption: "create-diary",
                diaryName: "",
                startDate: "",
                endDate: ""
            },
            createNew: true,
            minStart: "",
            minEnd: ""
        }
    }

    componentDidMount() {
        // Define minimum start date value
        const currentDate = new Date()
        const minStart = currentDate.toISOString().split('T')[0]
        // Define minimum end date value
        const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
        const minEnd = nextDate.toISOString().split('T')[0]
        // Update state with values
        this.setState({minStart, minEnd, values: {startDate: minStart}})
    }

    onChangeStudyOption = (event) => {
        this.setState({ values: {...this.state.values, enrolmentOption: event.target.value} })
        if (event.target.value == "create-diary") {
            this.setState({createNew: true})
        } else {
            this.setState({createNew: false})
        }
    }

    onChangeDiaryName = (event) => {
        this.setState({values: {...this.state.values, diaryName: event.target.value}})
    }

    onChangeStartDate = (event) => {
        this.setState({values: {...this.state.values, startDate: event.target.value}})
    }

    onChangeEndDate = (event) => {
        this.setState({values: {...this.state.values, endDate: event.target.value}})
    }

    handleSubmit = (event) => {
        event.preventDefault()
    
        var args;
        if (!this.state.createNew) {
            args = {diaryId: this.state.values.enrolmentOption}
        }
        else {
            // Convert date string format to ISO string
            var startDate = new Date(this.state.values.startDate)
            var completionDate = new Date(this.state.values.endDate)
            var difference = Math.abs(completionDate.getTime() - startDate.getTime())
            // Convert difference to days to get diary duration
            var duration = Math.ceil(difference / (1000 * 3600 * 24))

            // Set argument JSON for request
            args = {diaryName: this.state.values.diaryName, duration}
        }
        
        // Submit diary creation request to the API
        createDiary(this.props.user, args).then( response => {
            // Redirect client to home page
            this.props.history.push("/")
            // Flash message after redirect to display on next page
            this.props.flashMessage(`Successfully created new diary.`)
        })
        .catch(error => {
            if (error instanceof ValidationException) { 
                this.props.flashMessage(`${error.message}`, MessageTypes.error)
            } else {
                console.log(error)
                this.props.flashMessage(`Failed to create new diary.`, MessageTypes.error)
            }
        })
    }

    render() {
        var className;
        if (this.props.platform === "DESKTOP") {
            className = Style.desktopDiaryCreationForm
        }
        else if (this.props.platform === "MOBILE") {
            className = Style.mobileDiaryCreationForm
        }
        else {
            throw new UnexpectedPlatformError(this.props.platform, this.constructor.name)
        }
        
        return(
            <div id={className}>
                <h2>Create Drinks Diary</h2>

                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className={FormStyle.inputGroup}>
                        <label>Study Enrolment Options</label>
                        <select className={FormStyle.input} onChange={(event) => this.onChangeStudyOption(event)} 
                        value={this.state.values.enrolmentOption} >
                            <option value="create-diary">Create new diary</option>
                            <option value="test">Test Option</option>
                        </select>
                    </div>

                    <div className={FormStyle.inputGroup}>
                        <label>Diary Name</label>
                        <input className={FormStyle.input} onChange={(event) => this.onChangeDiaryName(event)} type="text" 
                        value={this.state.values.diaryName} placeholder="diary name..." disabled={!this.state.createNew} required />
                    </div>

                    <div className={FormStyle.inputRow}>
                        <div className={FormStyle.inputGroup}>
                            <label>Start Date</label>
                            <input className={FormStyle.input} type="date" onChange={(event) => this.onChangeStartDate(event)}
                            value={this.state.values.startDate} disabled={!this.state.createNew} min={this.state.minStart} required />
                        </div>

                        <div className={FormStyle.inputGroup}>
                            <label>End Date</label>
                            <input className={FormStyle.input} type="date" onChange={(event) => this.onChangeEndDate(event)}
                            value={this.state.values.endDate} disabled={!this.state.createNew} min={this.state.minEnd} required />
                        </div>
                    </div>

                    <div className={Style.formOptions}>
                        <Link to={"/"} className={ButtonStyle.buttonWarningSM}><i className="fa fa-times"></i> Cancel</Link>
                        <button type="submit" className={ButtonStyle.buttonSuccessSM}><i className="fa fa-plus"></i> Create Diary</button>
                    </div>
                </form> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        platform: state.app.platform,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBackOption: (location, type) => {
            dispatch(setBackOption(location, type))
        },
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        },
        flashMessage: (message, type) => {
            dispatch(flashMessage(message, type))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryCreationForm))