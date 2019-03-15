// React Imports
import React from 'react';
// Style Imports
import Style from './diary-entry.module.scss';


const DiaryEntry = (props) => (    
    <div className={Style.diaryEntry} onClick={() => props.onClick(true, props)}>
        <div className={Style.entryLeft}>
            <img src={props.thumbnail}/>
            <h6>{props.datetime}</h6>     
        </div>

        <h4>{props.drinkName}</h4>
    </div>
)

export default DiaryEntry