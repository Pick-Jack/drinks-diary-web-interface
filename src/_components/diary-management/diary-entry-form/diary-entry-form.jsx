// React Imports
import React from 'react';
// Router imports 
import { withRouter } from 'react-router-dom';
// Redux imports 
import { connect } from 'react-redux';
import { MessageTypes } from '../../../_helpers/enums'
import { flashMessage } from '../../../_redux/actions/message-flash.actions';
import { updateActiveTitle, createEntry, updateEntry, deleteEntry, unsetDiaryError, resetDiarySuccessStatus } from '../../../_redux/actions/diary.actions'
// Component Imports
import DesktopEntryForm from './_desktop'
import MobileEntryForm from './_mobile'

import * as Moment from 'moment'



class DiaryEntryForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            formValues: {
                time: (new Moment()).format("HH:mm"),
                brand: "", drinkName: "", 
                volume: { value: "", measure: "" },
                alcoholPercentage: "",
                caffeineContent: ""
            },
            displayDelete: false
        }

        if (!props.activeEntry) { this.props.updateActiveTitle("Create Entry") } 
        else { this.props.updateActiveTitle("Edit Entry") }
    }

    componentDidMount() {
        // If there is an active entry selected, update the state with
        // values to populate the form
        if (this.props.activeEntry) {
            Object.keys(this.props.diaryEntries).forEach(entryKey => {
                if (entryKey === this.props.activeEntry) {
                    const entry = this.props.diaryEntries[entryKey]
                    this.setState({
                        formValues: {
                            time: entry.time || (new Moment()).format("HH:mm"),
                            drinkName: entry.drinkName, brand: entry.brand || "",
                            volume: { value: entry.volume.amount, measure: entry.volume.measure },
                            alcoholPercentage: entry.alcoholPercentage || "",
                            caffeineContent: entry.caffeineContent || "",
                        }
                    })
                }
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.diaryError !== prevProps.diaryError) {
            if (this.props.diaryError !== undefined) {
                // Handle suitable errors
                switch (this.props.diaryError.type) {

                    case ("BodyValidationException"):
                        this.props.flashMessage(this.props.diaryError.message, MessageTypes.error)    
                        break;

                    case ("ValidationError"):
                        this.props.flashMessage(this.props.diaryError.errors[0].message, MessageTypes.error)    
                        break;

                    default:
                        // TODO: propagate unhandled exceptions
                        console.log(this.props.diaryError)
                }

                // Reset the error in the redux store
                this.props.unsetDiaryError()
            }
        } 
        else if (this.props.diarySuccess === true) {
            // Success flag indicates operation successfully performed, redirect user
            this.props.history.push(`/diary/${this.props.diaryId}`)
            // Flash success message
            this.props.flashMessage("Successfully created new diary entry.")                
            // Removes success flag from store
            this.props.resetDiarySuccessStatus()
        }
    }

    componentWillUnmount() {
        // Unset the active entry
    }

    // Update the state with the new form value for the provided key
    updateFormState = (key, value) => {
        this.setState({formValues: {...this.state.formValues, [key]: value}})
    }

    toggleDeleteModal = () => {
        this.setState({displayDelete: !this.state.displayDelete})
    }

    onSubmitEntry = () => {
        // Format form values into JSON suitable for request
        const requestArgs = {
            drinkName: this.state.formValues.drinkName,
            brand: this.state.formValues.brand || undefined,
            volume: this.state.formValues.volume.value,
            measure: this.state.formValues.volume.measure,
            caffeine: false,
            caffeineContent: this.state.formValues.caffeineContent || undefined,
            alcohol: false,
            alcoholPercentage: this.state.formValues.alcoholPercentage || undefined
        }

        const entryDatetime = new Moment(this.props.activeDate)
        const time = new Moment(this.state.formValues.time, "HH:mm")

        entryDatetime.hour(time.hour())
        entryDatetime.minute(time.minute())
        requestArgs["datetime"] = entryDatetime.toDate()

        console.log(requestArgs)

        if (this.props.activeEntry) {
            // Submit request to update entry with inputs
            this.props.updateEntry(this.props.authToken, this.props.diaryId, this.props.activeEntry, requestArgs)
        } else {
            // Create new entry using diary redux actions
            this.props.createEntry(this.props.authToken, this.props.diaryId, requestArgs)
        }
    }

    onDeleteEntry = () => {
        // Submit delete request to server
        this.props.deleteEntry(this.props.authToken, this.props.diaryId, this.props.activeEntry)
    }

    render() {
        const Form = this.props.platform==="DESKTOP" ? DesktopEntryForm : MobileEntryForm
        return ( 
            <Form {...this.props} {...this.state} onSubmit={this.onSubmitEntry} onChange={this.updateFormState} 
            onDelete={this.onDeleteEntry} onToggleDelete={this.toggleDeleteModal}/> 
        )
    }
}

const mapStateToProps = (state) => ({
    platform: state.app.platform,
    authToken: state.user.authToken,
    diaryId: state.diary.info.diaryId,
    activeDate: state.diary.activeDate,
    activeEntry: state.diary.activeEntry,
    diaryEntries: state.diary.entries,
    diarySuccess: state.diary.success,
    diaryError: state.diary.error
})

const mapDispatchToProps = (dispatch) => {
    return {
        flashMessage: (message, type) => {
            dispatch(flashMessage(message, type))
        },
        createEntry: (authToken, diaryId, requestArgs) => {
            dispatch(createEntry(authToken, diaryId, requestArgs))
        },
        updateEntry: (authToken, diaryId, entryId, args) => {
            dispatch(updateEntry(authToken, diaryId, entryId, args))
        },
        deleteEntry: (authToken, diaryId, entryId) => {
            dispatch(deleteEntry(authToken, diaryId, entryId))
        },
        unsetDiaryError: () => {
            dispatch(unsetDiaryError())
        },
        resetDiarySuccessStatus: () => {
            dispatch(resetDiarySuccessStatus())
        },
        updateActiveTitle: (title) => {
            dispatch(updateActiveTitle(title))
        }      
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryEntryForm))