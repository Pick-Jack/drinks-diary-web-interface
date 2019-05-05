// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption } from '../../_redux/actions/app.actions.js';
import { updateActiveDate, updateActiveEntry, updateActiveTitle } from '../../_redux/actions/diary.actions';
// Error imports
import { UnexpectedPlatformError } from '../../_helpers/errors'
// Component imports
import Log from '../log';
import DiaryEntry from './diary-entry';
// Image imports
import defaultDrink from '../../_images/default_drink.svg';
// Style Imports
import Style from './diary-log.module.scss';
import EntryStyle from './diary-entry.module.scss';
import * as Moment from 'moment';


class DiaryLog extends React.Component {
    
    constructor(props) {
        super(props)
        this.props.updateActiveTitle("Diary Log")
    }


    generateDiaryEntries = (activeDate) => {
        // Update the redux store for the date currently being viewed
        this.props.updateActiveDate(activeDate)
        activeDate = new Moment(activeDate)
        var entries = [];

        // Check entries have been successfully retrieved
        if (this.props.diaryEntries) {
            const entryKeys = Object.keys(this.props.diaryEntries)
            for (var i = 0; i < entryKeys.length; i++) {
                const entry = this.props.diaryEntries[entryKeys[i]]
                entry.date = new Date(entry.date)

                // Check diary entry is within the active date
                if (new Moment(entry.date).format("DD-MM-YYYY") === activeDate.format("DD-MM-YYYY")) {
                    entries.push((
                        /*
                        <DiaryEntry key={i} datetime={entry.date} entryId={entry._id} thumbnail={defaultDrink} 
                            drinkName={entry.drinkType} alcoholic={entry.alcoholic} caffeinated={entry.caffeinated} 
                            volume={`${entry.volume.amount} ${entry.volume.measure}`} onClick={this.toggleEntryExpand} 
                            onEdit={this.onEditEntry} match={this.props.match} expanded={expanded}
                        />
                        */
                        <DiaryEntry key={i} match={this.props.match}  entry={entry} thumbnail={defaultDrink} 
                            onClick={(entryId) => this.toggleEntryExpand(entryId)} onEdit={this.onEditEntry}
                        />
                    ))
                }
            }
        }
        return entries
    }

    onEditEntry = (entryId) => {
        this.props.updateActiveEntry(entryId)
        this.props.history.push(`/diary/${this.props.diaryInfo.diaryId}/edit`)
    }

    displayExpand = (display=false, entryProps={}) => {
        this.setState({displayExpand: display, entryProps: entryProps})
    }

    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div className={Style.desktopDiaryLog}>

                    <Log startDate={this.props.diaryInfo.startDate} endDate={this.props.diaryInfo.endDate} 
                    entryFunc={(activeDate) => this.generateDiaryEntries(activeDate)}>
                        {
                            this.props.diaryActiveDate && this.props.diaryActiveDate.getTime() === (new Date).setHours(0,0,0,0) &&
                            <Link to={`/diary/${this.props.diaryInfo.diaryId}/create`} className={EntryStyle.desktopDiaryEntryCreate}>
                                <i className="fa fa-plus"></i>
                                <h5>Create Entry</h5>
                            </Link>
                        }
                    </Log>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div className={Style.mobileDiaryLog}>
                    <Log 
                        startDate={this.props.diaryInfo.startDate}
                        activeDate={this.props.diaryActiveDate}
                        endDate={this.props.diaryInfo.endDate}
                        onNext={this.handleNextPage}
                        onPrev={this.handlePrevPage}
                        entries={this.generateDiaryEntries()}
                    >
                        {
                            this.props.diaryActiveDate && this.props.diaryActiveDate.getTime() === (new Date).setHours(0,0,0,0) &&
                            <Link to={`/diary/${this.props.diaryInfo.diaryId}/create`} className={EntryStyle.mobileDiaryEntryCreate}>
                                <i className="fa fa-plus"></i>
                                <h5>Create Entry</h5>
                            </Link>
                        }
                    </Log>
           
                </div>
            )
        }
        else {
            throw new UnexpectedPlatformError(this.props.platform, this.constructor.name)
        }
    }
}


const mapStateToProps = (state) => {
    return ({
        user: state.user,
        platform: state.app.platform,
        diaryInfo: state.diary.info,
        diaryEntries: state.diary.entries,
        diaryActiveDate: state.diary.activeDate
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBackOption: (location, type) => {
            dispatch(setBackOption(location, type))
        },
        updateActiveDate: (newDate) => {
            dispatch(updateActiveDate(newDate))
        },
        updateActiveEntry: (entryId) => {
            dispatch(updateActiveEntry(entryId))
        },
        updateActiveTitle: (title) => {
            dispatch(updateActiveTitle(title))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryLog))
