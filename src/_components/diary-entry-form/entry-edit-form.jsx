// React imports
import React from 'react'
// Router imports
import { Route, Redirect, Link, withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption } from '../../_redux/actions/app.actions';
import { flashMessage, MessageTypes } from '../../_redux/actions/message-flash.actions';
import { updateEntry, updateActiveEntry } from '../../_redux/actions/diary.actions'
// Component imports
import EntryForm from './entry-form'
// Style imports
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'


class EntryEditForm extends React.Component {
    constructor(props) {
        super(props)

        // Set back option 
        this.props.setBackOption(`/diary/${this.props.diaryId}`)
    }


    componentDidMount() {
        if (!this.props.diaryActiveEntry) {
            // Diary entry unknown, redirect client
            var splitUrl = this.props.match.url.split("/")
            this.props.history.push(`/${splitUrl[1]}/${splitUrl[2]}`)
        }
    }

    componentWillUnmount() {
        this.props.updateActiveEntry()
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
            console.log("here")
            console.log(error)
        }
    }

    deleteEntry = () => {
        console.log("deleted")
    }

    render() {

        const activeEntry = this.props.diaryEntries[this.props.diaryActiveEntry]

        const formOptions = [
            <Link key="1" to={`/diary/${this.props.diaryId}`} className={ButtonStyle.buttonWarning} id="cancel"><i className="fa fa-times"></i> Cancel</Link>,
            <button key="2" className={ButtonStyle.buttonDanger} type="button" id="deleteEntry" onClick={this.deleteEntry}><i className="fa fa-trash"></i> Delete</button>,
            <button key="3" className={ButtonStyle.buttonSuccess} type="submit" id="submitChanges"><i className="fa fa-pencil-alt"></i> Submit Edit</button>,
        ]

        return(
            <EntryForm 
                match={this.props.match} 
                diaryId={this.props.diaryId}
                flashMessage={this.props.flashMessage} 
                formTitle={"Edit Diary Entry"} 
                formValues={activeEntry}
                onSubmit={this.onSubmit} 
                formOptions={formOptions}
                
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
        flashMessage: (message, type) => {
            dispatch(flashMessage(message, type))
        },
        updateEntry: (authToken, diaryId, entryId, args) => {
            dispatch(updateEntry(authToken, diaryId, entryId, args))
        },
        updateActiveEntry: (entryId) => {
            dispatch(updateActiveEntry(entryId))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryEditForm))