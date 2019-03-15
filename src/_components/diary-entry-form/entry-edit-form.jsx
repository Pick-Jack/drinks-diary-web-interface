// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../_redux/actions/nav-options.actions';
import { flashMessage, messageTypes } from '../../_redux/actions/message-flash.actions';
// Component imports
import EntryForm from './entry-form'


class EntryEditForm extends React.Component {
    constructor(props) {
        super(props)

        this.state =  {
            drinkName: "tset",
            alcoholic: "",
            caffeinated: "",
            volume: {amount: "", measurement: ""}
        }
    }

    componentDidMount() {
        // Set the sidebar navigation options
        this.props.setNavOptions([
            (<Link to={`/diary/${this.props.match.params.id}`}><i className="fa fa-arrow-left"></i> Back</Link>),
        ])

        // TODO: fetch diary entry info
    }

    onSubmit = (formValues) => {
        // TODO: submit form values to create diary entry
    }

    render() {
        return(
            <EntryForm flashMessage={this.props.flashMessage} match={this.props.match} formTitle={"Edit Diary Entry"} 
            onSubmit={this.onSubmit} state={this.state} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        },
        flashMessage: (message, type) => {
            dispatch(flashMessage(message, type))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(EntryEditForm))