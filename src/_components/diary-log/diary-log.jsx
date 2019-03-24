// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions.js';
import { updateActiveDate, updateActiveEntry } from '../../_redux/actions/diary.actions';
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


class DiaryLog extends React.Component {
    constructor(props) {
        super(props)
    
        // Set back option
        this.props.setBackOption("/")
        // Set nav bar options
        this.props.setNavOptions([
            {location: `${this.props.match.url}/create`, jsx: (<span><i className="fa fa-plus"></i> Create Entry</span>)},
            {location: `${this.props.match.url}/exerciseLog`, jsx: (<span><i className="fa fa-book"></i> Exercise Log</span>)}
        ])
   
        this.state = {
            expandedEntry: "",
            nextEnabled: true,
            prevEnabled: true,
            entryProps: {}
        }
    }

    toggleEntryExpand = (entryId) => {
        if (entryId === this.state.expandedEntry){
            this.setState({expandedEntry: ""})
        } else {
            this.setState({expandedEntry: entryId})
        }
    }

    generateDiaryEntries = () => {
        var entries = [];
        // Check entries have been successfully retrieved
        if (this.props.diaryEntries && this.props.diaryActiveDate){
            const entryKeys = Object.keys(this.props.diaryEntries)
            for (var i = 0; i < entryKeys.length; i++) {
                const entry = this.props.diaryEntries[entryKeys[i]]
                entry.date = new Date(entry.date)

                // Toggle expanded status
                var expanded = (this.state.expandedEntry === entry._id)

                // Check diary entry is within the active date
                if (entry.date.getDate() === this.props.diaryActiveDate.getDate() &&
                    entry.date.getMonth() === this.props.diaryActiveDate.getMonth() &&
                    entry.date.getFullYear() === this.props.diaryActiveDate.getFullYear()) {
                    entries.push((
                        <DiaryEntry 
                            key={i}
                            datetime={entry.date} 
                            entryId={entry._id}
                            thumbnail={defaultDrink} 
                            drinkName={entry.drinkType} 
                            alcoholic={entry.alcoholic} 
                            caffeinated={entry.caffeinated} 
                            volume={`${entry.volume.amount} ${entry.volume.measure}`} 
                            onClick={this.toggleEntryExpand} 
                            match={this.props.match}
                            expanded={expanded}
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

    handleNextPage = () => {
        // Check current date is not completion date
        if (this.props.diaryActiveDate < this.props.diaryInfo.endDate) {
            // Increment date
            var nextDay = this.props.diaryActiveDate
            nextDay.setDate(nextDay.getDate() + 1);
            this.props.updateActiveDate(nextDay)
        }
    }

    handlePrevPage = () => {
        // Check current date is not completion date
        if (this.props.diaryActiveDate > this.props.diaryInfo.startDate) {
            // Decrement date
            var prevDay = this.props.diaryActiveDate
            prevDay.setDate(prevDay.getDate() - 1);
            this.props.updateActiveDate(prevDay)
        }
    }

    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div className={Style.desktopDiaryLog}>
                    <Log 
                        startDate={this.props.diaryInfo.startDate}
                        activeDate={this.props.diaryActiveDate}
                        endDate={this.props.diaryInfo.endDate}
                        onNext={this.handleNextPage}
                        onPrev={this.handlePrevPage}
                        entries={this.generateDiaryEntries()}
                    >
                        <Link to={`/diary/${this.props.diaryInfo.diaryId}/create`} className={EntryStyle.diaryEntryCreate}>
                            <i className="fa fa-plus"></i>
                            <h5>Create Entry</h5>
                        </Link>
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
                    />
    
                    <Link to={`${this.props.match.url}/create`} className={Style.newEntryOption}>
                        <h6><i className="fa fa-plus"></i></h6>
                        <label>New Entry</label>
                    </Link>
           
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
        platform: state.app.platform,
        user: state.user,
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
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        },
        updateActiveDate: (newDate) => {
            dispatch(updateActiveDate(newDate))
        },
        updateActiveEntry: (entryId) => {
            dispatch(updateActiveEntry(entryId))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryLog))
