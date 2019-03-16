// React imports
import React from 'react';
// Router imports
import { Link } from 'react-router-dom';
// Style imports
import Style from './diary-entry.module.scss';


const DiaryEntry = (props) => (
    <Link to={`/diary/${props.id}`} className={Style.diaryEntry}>
        <h4>{props.diaryName}</h4>

        <div className={Style.info}>
            <p>Duration: {props.duration} days</p>
            <p>Last Entry: {props.lastEntry}</p>
        </div>

        <h5>{props.status}</h5>
    </Link>
)

export default DiaryEntry