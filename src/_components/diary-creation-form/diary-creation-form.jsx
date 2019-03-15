// React imports
import React from 'react';
// Router imports 
import { withRouter, Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../_redux/actions/nav-options.actions';
// API function imports
import { createDiary } from '../../_services/diary.service';
// Style imports
import Style from './diary-creation-form.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../_helpers/style-utility/form-control.module.scss';
import { EventEmitter } from 'events';


class DiaryCreationForm extends React.Component {

    constructor(props) {
        super(props)

        this.props.setNavOptions([
            (<Link to={`/`}><i className="fa fa-arrow-left"></i> Back</Link>),
        ])

        this.state = {
            values: {
                enrolmentOption: "create-diary",
                diaryName: "",
                startDate: "",
                endDate: ""
            },
            createNew: true
        }
    }

    onChangeStudyOption = (event) => {
        this.setState({ values: {...this.state.values, enrolmentOption: event.target.value}})
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
    
        var response
        if (this.state.values.enrolmentOption !== "create-diary") {
            response = null
        }
        else {
            // Convert date string format to ISO string
            var startDate = new Date(this.state.values.startDate).toISOString()
            var endDate = new Date(this.state.values.startDate).toISOString()

            response = createDiary(this.props.user, null,
                this.state.values.diaryName, startDate, endDate)
        }
        console.log(response)

        this.props.history.push("/")
    }

    render() {
        return(
            <div id={Style.diaryCreationForm}>
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
                            value={this.state.values.startDate} disabled={!this.state.createNew} required />
                        </div>

                        <div className={FormStyle.inputGroup}>
                            <label>End Date</label>
                            <input className={FormStyle.input} type="date" onChange={(event) => this.onChangeEndDate(event)}
                            value={this.state.values.endDate} disabled={!this.state.createNew} required />
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
        platform: state.platform,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryCreationForm))