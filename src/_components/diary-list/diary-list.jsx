// React imports
import React from 'react';
// Router imports
import { withRouter, Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
// Component imports
import DiaryEntry from './diary-entry';
// Style imports
import Style from './diary-list.module.scss';


class DiaryList extends React.Component {

    componentDidMount() {
        // TODO: fetch diaries from API
    }

    render() {
        return (
            <div className={Style.diaryList}>
                <DiaryEntry id={"diaryID"} diaryName={"My Drinks Diary"} duration={"5"} lastEntry={"15 10/05/2019"} status={"Active"} />
                <DiaryEntry id={"diaryID"} diaryName={"My Drinks Diary"} duration={"5"} lastEntry={"15 10/05/2019"} status={"Active"} />
                <DiaryEntry id={"diaryID"} diaryName={"My Drinks Diary"} duration={"5"} lastEntry={"15 10/05/2019"} status={"Active"} />
            
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
        platform: state.app.platform
    })
}

export default withRouter(connect(matchStateToProps)(DiaryList))