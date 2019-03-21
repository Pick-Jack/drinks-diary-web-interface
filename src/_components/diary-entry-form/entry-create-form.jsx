// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux';
import { MessageTypes } from '../../_helpers/enums'
import { flashMessage } from '../../_redux/actions/message-flash.actions';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions';
// Service imports 
import { createDiaryEntry } from '../../_services/diary.service'
// Component imports
import EntryForm from './entry-form'
import { ValidationException } from '../../_helpers/errors';


class EntryCreateForm extends React.Component {
    constructor(props) {
        super(props)
        // Set back option 
        this.props.setBackOption(`/diary/${this.props.diaryId}`)
        // Set the sidebar navigation options
        this.props.setNavOptions([])
    }

    onSubmit = (formValues) => {
        const requestArgs = {
            drinkType: formValues.drinkName,
            volume: formValues.volume.value,
            measure: formValues.volume.measure,
            caffeinated: formValues.caffeinated,
            alcoholic: formValues.alcoholic
        }

        createDiaryEntry(this.props.user.authToken, this.props.diaryId, requestArgs)
            .then(response => {
                if (!response.error) {
                    this.props.history.push(`/diary/${this.props.diaryId}`)
                    // Flash message after history change to prevent hiding on page load
                    this.props.flashMessage("Successfully created new diary entry")
                } 
                else {
                    if (response.response.type === "MissingBodyArgument") {
                        this.props.flashMessage(response.response.message, MessageTypes.error)
                    } else {
                        console.log(response)
                    }
                }
            })
    }

    render() {
        return(
            <EntryForm 
                diaryId={this.props.diaryId}
                match={this.props.match}
                flashMessage={this.props.flashMessage}    
                formTitle={"Create Diary Entry"} 
                onSubmit={this.onSubmit} 
            />
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryCreateForm))