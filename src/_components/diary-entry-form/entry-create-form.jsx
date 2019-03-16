// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions';
import { flashMessage, messageTypes } from '../../_redux/actions/message-flash.actions';
// Component imports
import EntryForm from './entry-form'


class EntryCreateForm extends React.Component {
    constructor(props) {
        super(props)

        // Set back option 
        this.props.setBackOption(`/diary/${this.props.match.params.id}`)
        // Set the sidebar navigation options
        this.props.setNavOptions([])
    }

    onSubmit = (formValues) => {
        // TODO: submit form values to create diary entry
    }

    render() {
        return(
            <EntryForm flashMessage={this.props.flashMessage} match={this.props.match} formTitle={"Create Diary Entry"} onSubmit={this.onSubmit} />
        )
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

export default withRouter(connect(null, mapDispatchToProps)(EntryCreateForm))