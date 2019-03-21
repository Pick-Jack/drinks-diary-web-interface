// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions';
import { flashMessage, MessageTypes } from '../../_redux/actions/message-flash.actions';
import { updateEntry } from '../../_redux/actions/diary.actions'
// Component imports
import EntryForm from './entry-form'


class EntryEditForm extends React.Component {
    constructor(props) {
        super(props)

        this.state =  {
            drinkName: "tset",
            alcoholic: "",
            caffeinated: "",
            volume: {amount: "", measurement: ""},
        }

        // Set back option 
        this.props.setBackOption(`/diary/${this.props.diaryId}`)
        // Set the sidebar navigation options
        this.props.setNavOptions([])
    }

    onSubmit = (formValues) => {
        try {
            const requestArgs = {
                drinkType: formValues.drinkName,
                volume: formValues.volume.amount,
                measurement: formValues.volume.measurement,
                alcoholic: formValues.alcoholic,
                caffeinated: formValues.caffeinated
            }
            
            // Submit request to update entry with inputs
            this.props.updateEntry(
                this.props.authToken, 
                this.props.diaryId, 
                this.props.diaryActiveEntry,
                requestArgs
            )
        } catch (error) {

        }
    }

    componentDidMount() {
        if (this.props.diaryEntries && this.props.diaryActiveEntry) {
            const entry = this.props.diaryEntries[this.props.diaryActiveEntry]
            this.setState({
                drinkName: entry.drinkType,
                alcoholic: entry.alcoholic,
                caffeinated: entry.caffeinated,
                volume: {amount: entry.volume.amount, measurement: entry.volume.measure},
            })
        }    
    }

    render() {
        return(
            <EntryForm 
                match={this.props.match} 
                diaryId={this.props.diaryId}
                flashMessage={this.props.flashMessage} 
                formTitle={"Edit Diary Entry"} 
                onSubmit={this.onSubmit} 
                state={this.state} 
            />
        )
    }
}

const mapStateToProps = (state) => ({
    authToken: state.user.authToken,
    diaryId: state.diary.info.diaryId,
    diaryEntries: state.diary.entries,
    diaryActiveEntry: state.diary.activeEntryId
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
        updateEntry: (authToken, diaryId, entryId, args) => {
            dispatch(updateEntry(authToken, diaryId, entryId, args))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryEditForm))