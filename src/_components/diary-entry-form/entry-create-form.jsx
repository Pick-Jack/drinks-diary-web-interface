// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux';
import { MessageTypes } from '../../_helpers/enums'
import { createEntry } from '../../_redux/actions/diary.actions';
import { flashMessage } from '../../_redux/actions/message-flash.actions';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions';
// Component imports
import EntryForm from './entry-form'
import { ValidationException } from '../../_helpers/errors';
// Style imports
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'


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

        try {
            // Create new entry using diary redux actions
            this.props.createEntry(this.props.user.authToken, this.props.diaryId, requestArgs)
            // Redirect client on successful creation
            this.props.history.push(`/diary/${this.props.diaryId}`)
            // Flash message after history change to prevent hiding on page load
            this.props.flashMessage("Successfully created new diary entry")
        }
        catch (error) {
            console.log(error)
            if (error.type === "MissingBodyArgument") {
                this.props.flashMessage(error.message, MessageTypes.error)
            } else {
                console.log(error)
            }
        }
    }

    render() {
        const formOptions = [
            <Link to={`/diary/${this.props.diaryId}`} className={ButtonStyle.buttonWarning} id="cancel"><i className="fa fa-times"></i> Cancel</Link>,
            <button className={ButtonStyle.buttonSuccess} type="submit" id="submitChanges"><i className="fa fa-plus"></i> Create Entry</button>,
        ]

        return(
            <EntryForm 
                diaryId={this.props.diaryId}
                match={this.props.match}
                flashMessage={this.props.flashMessage}    
                formTitle={"Create Diary Entry"} 
                formOptions={formOptions}
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
        },
        createEntry: (authToken, diaryId, requestArgs) => {
            dispatch(createEntry(authToken, diaryId, requestArgs))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryCreateForm))