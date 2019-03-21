// React imports
import React from 'react';
// Router imports
import { withRouter, Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
// Service imports
import { getUserDiaries } from '../../_services/diary.service'
// Component imports
import DiaryEntry from './diary-entry';
// Style imports
import Style from './diary-list.module.scss';
import { flashMessage } from '../../_redux/actions/message-flash.actions';


class DiaryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            diaryEntries: []
        }
    }

    componentDidMount() {
        // Get user diaries from the Drinks Diary API
        getUserDiaries(this.props.user.authToken)
            .then(response => {
                if (!response.error) {
                    const currentDate = new Date()
                    const diaryEntries = response.response.results.map((entry, index) => (
                        <DiaryEntry 
                            key={index} 
                            id={entry._id} 
                            diaryName={entry.diaryName} 
                            duration={entry.duration}
                            lastEntry={entry.lastEntry ? entry.lastEntry : "-"} 
                            status={(currentDate >= new Date(entry.startDate) && currentDate <= new Date(entry.endDate)) ? "Active" : "Complete" } 
                        />
                    ))    
                    this.setState({diaryEntries: diaryEntries})
                }
            })
    }

    render() {
        return (
            <div className={Style.diaryList}>
                {this.state.diaryEntries}
            
                <Link to={`/createDiary`} className={Style.newDiaryOption}>
                    <i className="fa fa-plus"></i>
                    <h6>Create Diary</h6>
                </Link>
            </div>
        )
    }
}

const matchStateToProps = (state) => {
    return ({
        user: state.user,
        platform: state.app.platform,
    })
}

export default withRouter(connect(matchStateToProps)(DiaryList))