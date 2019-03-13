// React imports
import React from 'react';
// Router dependencies
import { Link } from 'react-router-dom';
// Style dependencies
import Style from './home.module.scss'


export const DesktopDiary = (props) => (
    <Link to={`/diary/${props.id}`} className={Style.diary}>
        <h4>{props.diaryName}</h4>

        <div className={Style.info}>
            <p>Duration: {props.duration} days</p>
            <p>Last Entry: {props.lastEntry}</p>
        </div>

        <h5>{props.status}</h5>
    </Link>
)