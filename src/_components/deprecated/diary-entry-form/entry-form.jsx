// React Imports
import React from 'react';
import update from 'react-addons-update'
// Router imports 
import { Link } from 'react-router-dom';
// Redux imports 
import { connect } from 'react-redux';
import { MessageTypes } from '../../_helpers/enums'
import { setBackOption } from '../../_redux/actions/app.actions';
import { flashMessage } from '../../_redux/actions/message-flash.actions';
import { updateActiveTitle, createEntry, updateEntry, deleteEntry, unsetDiaryError, resetDiarySuccessStatus } from '../../_redux/actions/diary.actions'

// Component Imports 
import DeleteEntryModal from './delete-entry-modal'
import VolumeSelector from '../volume-selector';
// Style Imports
import Style from './diary-entry-form.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../_helpers/style-utility/form-control.module.scss';


class EntryForm extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            displayDelete: false,
            displayWarning: false,
            caffeineContentEnabled: false,
            alcoholPercentageEnabled: false,
            formValues: {
                drinkName: "",
                brand: "",
                volume: {
                    value: "",
                    measure: ""
                },
                alcohol: {
                    status: "",
                    percentage: ""
                },
                caffeine: {
                    status: "",
                    content: ""
                }
            }
        }

        if (!props.activeEntry) { this.props.updateActiveTitle("Create Entry") } 
        else { this.props.updateActiveTitle("Edit Entry") }
    }

    componentDidMount() {
        if (this.props.activeEntry !== undefined) {
            Object.keys(this.props.diaryEntries).forEach(entryKey => {
                if (entryKey === this.props.activeEntry) {
                    const entry = this.props.diaryEntries[entryKey]
                    this.setState({
                        formValues: {
                            drinkName: entry.drinkName,
                            brand: entry.brand || "",
                            volume: {
                                value: entry.volume.amount,
                                measure: entry.volume.measure
                            },
                            alcohol: {
                                status: entry.containsAlcohol,
                                percentage: entry.alcoholPercentage || ""
                            },
                            caffeine: {
                                status: entry.containsCaffeine,
                                content: entry.caffeineContent || ""
                            }
                        },
                        caffeineContentEnabled: entry.containsCaffeine,
                        alcoholPercentageEnabled: entry.containsAlcohol,
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
                        console.log("validation error")
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
            this.props.match.history.push(`/diary/${this.props.diaryId}`)
            // Flash success message
            this.props.flashMessage("Successfully created new diary entry.")                
            // Removes success flag from store
            this.props.resetDiarySuccessStatus()
        }
    }

    onChangeInput = (event, key) => {
        this.setState({
            formValues: update(this.state.formValues, {
                [key]: { $set: event.target.value }
            })
        })
    }

    onChangeBrand = (event) => {
        this.setState({
            formValues: update(this.state.formValues, {
                brand: { $set: event.target.value }
            })
        })
    }

    onChangeVolumeValues = (event, key) => {
        this.setState({
            formValues: update(this.state.formValues, {
                volume: {
                    [key] : { $set: event.target.value}
                } 
            })
        })
    }

    onChangeCaffeineValues = (event, key) => {
        var status = this.state.formValues.caffeine.status
        var content = this.state.formValues.caffeine.content

        // Toggle caffeine content field if status changed
        if (key === "status") { 
            status = (event.target.value === "true") ? true : false
            // Reset caffeine content value if set to decaf
            if (!status) { content = "" }
        } else if (key === "content") { content = event.target.value }
        
        // Update state form values
        this.setState({
            caffeineContentEnabled: status,
            formValues: update(this.state.formValues, {
                caffeine: {
                    status: { $set: status },
                    content: { $set: content }
                }
            })
        })
    }

    onChangeAlcoholValues = (event, key) => {
        var status = this.state.formValues.alcohol.status
        var percentage = this.state.formValues.alcohol.percentage

        // Toggle alcohol percentage field if status changed
        if (key === "status") { 
            status = (event.target.value === "true") ? true : false
            // Reset alcohol percentage value if set to decaf
            if (!status) { percentage = "" }
        } else if (key === "percentage") { percentage = event.target.value }
        
        // Update state form values
        this.setState({
            alcoholPercentageEnabled: status,
            formValues: update(this.state.formValues, {
                alcohol: {
                    status: { $set: status },
                    percentage: { $set: percentage }
                } 
            })
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        
        // Format form values into JSON suitable for request
        const requestArgs = {
            drinkName: this.state.formValues.drinkName,
            brand: this.state.formValues.brand || undefined,
            volume: this.state.formValues.volume.value,
            measure: this.state.formValues.volume.measure,
            caffeine: this.state.formValues.caffeine.status,
            caffeineContent: this.state.formValues.caffeine.content || undefined,
            alcohol: this.state.formValues.alcohol.status,
            alcoholPercentage: this.state.formValues.alcohol.percentage || undefined
        }

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

    onToggleWarningModal = () => {
        this.setState({displayWarning: !this.state.displayWarning})
    }

    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopEntryForm}>
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        <div className={Style.entryRow}>
                            <div className={Style.entryCol}>

                                <img className={Style.entryThumbnail} />

                                <div className={FormStyle.inputGroup}>
                                    <label>Drink Name:</label>
                                    <input className={FormStyle.input} type="text" 
                                    placeholder="drink name..." value={this.state.formValues.drinkName} 
                                    onChange={(event) => this.onChangeInput(event, "drinkName")} required />
                                </div>

                                <div className={FormStyle.inputGroup}>
                                    <label>Brand (Optional):</label>
                                    <input className={FormStyle.input} type="text" 
                                    placeholder="brand..." value={this.state.formValues.brand} 
                                    onChange={(event) => this.onChangeInput(event, "brand")} />
                                </div>

                                <div className={FormStyle.inputGroup}>
                                    <label>Volume:</label>
                                    <VolumeSelector onChange={this.onChangeVolumeValues} required={true} 
                                    volume={this.state.formValues.volume.value} measure={this.state.formValues.volume.measure} />
                                </div>
                            </div>
            
                            <div className={Style.entryCol}>
                            
                                {/* Form inputs for detaling the caffeine content */}
                                <div className={Style.sectionTitle}><h3>Caffeine</h3></div>

                                <div className={FormStyle.inputGroup}>
                                    <label>Contains Caffeine:</label>
                                    <select className={FormStyle.input} value={this.state.formValues.caffeine.status} 
                                    onChange={(event) => this.onChangeCaffeineValues(event, "status")}>
                                        <option value="" disabled>-- select an option --</option>
                                        <option value={false}>Decaf</option>
                                        <option value={true}>Caffeinated</option>
                                    </select>
                                </div>

                                <div className={FormStyle.inputGroup}>
                                    <label>Caffeine Content:</label>
                                    <input className={FormStyle.input} type="number" disabled={!this.state.caffeineContentEnabled}
                                    placeholder="caffeine content..."  value={this.state.formValues.caffeine.content} 
                                    onChange={(event) => this.onChangeCaffeineValues(event, "content")} />
                                </div>

                                {/* Form inputs for detaling the alcohol content */}
                                <div className={Style.sectionTitle}><h3>Alcohol</h3></div>

                                <div className={FormStyle.inputGroup}>
                                    <label>Contains Alcohol:</label>
                                    <select className={FormStyle.input} value={this.state.formValues.alcohol.status} 
                                    onChange={(event) => this.onChangeAlcoholValues(event, "status")}>
                                        <option value="" disabled>-- select an option --</option>
                                        <option value={false}>Non-alcoholic</option>
                                        <option value={true}>Alcoholic</option>
                                    </select>
                                </div>

                                <div className={FormStyle.inputGroup}>
                                    <label>Alcohol Percentage:</label>
                                    <input className={FormStyle.input} type="number" disabled={!this.state.alcoholPercentageEnabled}
                                    placeholder="alcohol percentage..."  value={this.state.formValues.alcohol.percentage} 
                                    onChange={(event) => this.onChangeAlcoholValues(event, "percentage")} />
                                </div>
                            </div>
                        </div>

                        <div className={Style.entryRow}>
                            <div className={Style.formActions}>
                                <div className={Style.actionsLeft}>
                                    <Link to={`/diary/${this.props.diaryId}`} className={ButtonStyle.buttonWarning}>
                                        <i className="fa fa-times"></i> Cancel
                                    </Link>
                                    {
                                        this.props.activeEntry &&
                                        <button type="button" className={ButtonStyle.buttonDanger} onClick={this.onToggleWarningModal}>
                                            <i className="fa fa-trash"></i> Delete Entry
                                        </button>
                                    }
                                </div>
                                <div className={Style.actionsRight}>
                                    <button type="submit" className={ButtonStyle.buttonSuccess}>
                                        { !this.props.activeEntry && (<div><i className="fa fa-plus"></i> Create</div>) }
                                        { this.props.activeEntry && (<div><i className="fa fa-check"></i> Submit Changes</div>) }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    { 
                        // Modal for warning prior to deleting an entry
                        this.state.displayWarning &&
                        <DeleteEntryModal onToggleModal={this.onToggleWarningModal} onDeleteEntry={this.onDeleteEntry} />
                    }

                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div id={Style.mobileEntryForm}>
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        
                        <img className={Style.entryThumbnail} />
                        
                        {/* General drink entry details: name, brand, volume*/}
                        <div className={Style.section}>
                            <div className={FormStyle.inputGroup}>
                                <label>Drink Name:</label>
                                <input className={FormStyle.input} type="text" 
                                placeholder="drink name..." value={this.state.formValues.drinkName} 
                                onChange={(event) => this.onChangeInput(event, "drinkName")} required />
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Brand (Optional):</label>
                                <input className={FormStyle.input} type="text" 
                                placeholder="brand..." value={this.state.formValues.brand} 
                                onChange={(event) => this.onChangeInput(event, "brand")} />
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Volume:</label>
                                <VolumeSelector onChange={this.onChangeVolumeValues} required={true} 
                                volume={this.state.formValues.volume.value} measure={this.state.formValues.volume.measure} />
                            </div>
                        </div>

                        {/* Caffeine form inputs : status, content*/}
                        <div className={Style.section}>
                            <div className={Style.sectionTitle}><h3>Caffeine</h3></div>

                            <div className={FormStyle.inputGroup}>
                                <label>Contains Caffeine:</label>
                                <select className={FormStyle.input} value={this.state.formValues.caffeine.status} 
                                onChange={(event) => this.onChangeCaffeineValues(event, "status")}>
                                    <option value="" disabled>-- select an option --</option>
                                    <option value={false}>Decaf</option>
                                    <option value={true}>Caffeinated</option>
                                </select>
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Caffeine Content:</label>
                                <input className={FormStyle.input} type="number" disabled={!this.state.caffeineContentEnabled}
                                placeholder="caffeine content..."  value={this.state.formValues.caffeine.content} 
                                onChange={(event) => this.onChangeCaffeineValues(event, "content")} />
                            </div>
                        </div>

                        {/* Alcohol form inputs : status, percentage */}
                        <div className={Style.section}>
                            <div className={Style.sectionTitle}><h3>Alcohol</h3></div>

                            <div className={FormStyle.inputGroup}>
                                <label>Contains Alcohol:</label>
                                <select className={FormStyle.input} value={this.state.formValues.alcohol.status} 
                                onChange={(event) => this.onChangeAlcoholValues(event, "status")}>
                                    <option value="" disabled>-- select an option --</option>
                                    <option value={false}>Non-alcoholic</option>
                                    <option value={true}>Alcoholic</option>
                                </select>
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Alcohol Percentage:</label>
                                <input className={FormStyle.input} type="number" disabled={!this.state.alcoholPercentageEnabled}
                                placeholder="alcohol percentage..."  value={this.state.formValues.alcohol.percentage} 
                                onChange={(event) => this.onChangeAlcoholValues(event, "percentage")} />
                            </div>
                        </div>

                        {/* Form actions */}                        
                        <div className={Style.formActions}>
                            <div className={Style.actionsLeft}>
                                <Link to={`/diary/${this.props.diaryId}`} className={ButtonStyle.buttonWarning}><i className="fa fa-times"></i> Cancel</Link>
                                { 
                                    this.props.activeEntry &&
                                    <button type="button" className={ButtonStyle.buttonDanger} onClick={this.onToggleWarningModal}>
                                    <i className="fa fa-trash"></i> Delete Entry</button>
                                }
                            </div>
                            <div className={Style.actionsRight}>
                                <button type="submit" className={ButtonStyle.buttonSuccess}>
                                    { !this.props.activeEntry && (<div><i className="fa fa-plus"></i> Create</div>) }
                                    { this.props.activeEntry && (<div><i className="fa fa-check"></i> Submit Changes</div>) }
                                </button>
                            </div>
                        </div>

                    </form>    
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    platform: state.app.platform,
    authToken: state.user.authToken,
    diaryId: state.diary.info.diaryId,
    activeEntry: state.diary.activeEntryId,
    diaryEntries: state.diary.entries,
    diaryError: state.diary.error,
    diarySuccess: state.diary.success
})

const mapDispatchToProps = (dispatch) => {
    return {
        setBackOption: (location, type) => {
            dispatch(setBackOption(location, type))
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)
