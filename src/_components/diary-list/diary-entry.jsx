// React imports
import React from 'react';
// Router imports
import { Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
// Style imports
import Style from './diary-entry.module.scss';
import StatusStyle from '../../_helpers/style-utility/status-indicator.module.scss';


const DiaryEntry = (props) => (
    <Link to={`/diary/${props.id}`} onClick={() => {props.onSelect(props.id)}}
    className={(props.id === props.activeDiary) ? Style.diaryEntrySelected : Style.diaryEntry} >

        <h4>{props.diaryName}</h4>

        <div className={Style.info}>
            <p>Duration: {props.duration} days</p>
            <p>Last Entry: {props.lastEntry}</p>
        </div>

        <div className={StatusStyle.statusIndicator}>
            {(props.status === "Active") && <div className={StatusStyle.iconSuccessXS}></div>}
            {(props.status === "Pending") && <div className={StatusStyle.iconWarningXS}></div>}
            {(props.status === "Complete") && <div className={StatusStyle.iconDangerXS}></div>}
            <h5>{props.status}</h5>
        </div>

    </Link>
)

const matchStateToProps = (state) => {
    return ({
        activeDiary: state.diary.info.diaryId
    })
}

export default connect(matchStateToProps)(DiaryEntry)