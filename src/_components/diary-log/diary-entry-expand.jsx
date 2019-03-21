// React imports
import React from 'react'
// Router imports
import { Link } from 'react-router-dom'
// Style imports 
import Style from './diary-entry-expand.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'


const DiaryEntryExpand = (props) => (
    <div className={Style.diaryExpand}>

        <div className={Style.header}>
            <a onClick={ () => props.hide(false, {}) } className={Style.close}><i className="fa fa-times"></i></a>
            <button onClick={() => props.onEdit(props.entryProps.entryId)} className={ButtonStyle.buttonSM}><i className="fa fa-pencil-alt"></i> Edit</button>
        </div>

        <div className={Style.main}>
            <img src={props.entryProps.thumbnail} />

            <div className={Style.info}>
                <h4>{`${props.entryProps.datetime.getHours()}:${props.entryProps.datetime.getMinutes()}`}</h4>
                <h4>{props.entryProps.drinkName}</h4>
                <h4>{props.entryProps.volume}</h4>
            </div>

            <div className={Style.statusFlags}>
                { props.entryProps.alchoholic && <div className={Style.alcoholStatus}><i className="fa fa-cocktail"></i> Contains alcohol</div> }
                { props.entryProps.caffeinated && <div className={Style.caffeinatedStatus}><i className="fa fa-coffee"></i> Contains caffeine</div> }
            </div>
        </div>
    </div>
)

export default DiaryEntryExpand