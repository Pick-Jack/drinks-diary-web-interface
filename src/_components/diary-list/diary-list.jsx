// React imports
import React from 'react';
// Router imports
import { withRouter, Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
import { setActiveDiary } from '../../_redux/actions/diary.actions'
// Service imports
import { getUserDiaries } from '../../_services/diary.service'
// Component imports
import DiaryEntry from './diary-entry';
// Style imports
import Style from './diary-list.module.scss';
// Utils
import { getStatus } from '../../_helpers/util-functions';


class DiaryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            diaryEntries: [],
        }
    }

    componentDidMount() {
        // Get user diaries from the Drinks Diary API
        getUserDiaries(this.props.authToken)
            .then(response => {
                if (!response.error) {
                    const diaryEntries = response.response.results.map((entry, index) => {
                        const startDate = new Date(entry.startDate)
                        const endDate = new Date(entry.endDate)
                        const status = getStatus(startDate, endDate)                      

                        return(
                            <DiaryEntry 
                                key={index} 
                                id={entry._id} 
                                onSelect={this.onSelectDiary}
                                diaryName={entry.diaryName} 
                                duration={entry.duration}
                                lastEntry={entry.lastEntry ? entry.lastEntry : "-"} 
                                status={status} 
                            />
                        )
                    })    
                    this.setState({diaryEntries: diaryEntries})
                }
            })
    }

    onSelectDiary = (entryId) => {
        this.props.setActiveDiary(this.props.authToken, entryId)
    }

    render() {
        return (
            <div className={Style.diaryList}>
                <Link to={`/createDiary`} className={Style.newDiaryOption}>
                    <i className="fa fa-plus"></i>
                    <h6>Create Diary</h6>
                </Link>
                {this.state.diaryEntries}
            </div>
        )
    }
}

const matchStateToProps = (state) => {
    return ({
        authToken: state.user.authToken,
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveDiary: (authToken, entryId) => {
            dispatch(setActiveDiary(authToken, entryId))
        }
    }
}

export default withRouter(connect(matchStateToProps, mapDispatchToProps)(DiaryList))