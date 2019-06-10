// React imports
import React from 'react'
// Router imports
import { Link } from 'react-router-dom'
// Style Imports
import Style from './diary-configuration-form.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../../_helpers/style-utility/form-control.module.scss'
// Util imports
import * as Moment from 'moment'


const MobileDiaryConfigForm = (props) => {
    return (
        <form id={Style.MobileConfigForm} onSubmit={() => props.updateDiaryConfiguration()}>
            <div className={Style.formMain}>
                <div className={FormStyle.inputGroup}>
                    <label>Diary Name:</label>
                    <input className={FormStyle.input} type="text" placeholder="diary name..." value={props.diary.diaryName} />
                </div>

                <div className={FormStyle.inputRow}>
                    <div className={FormStyle.inputGroup}>
                        <label>Start Date:</label>
                        <input className={FormStyle.input} type="date" value={(new Moment(props.diary.startDate)).format("YYYY-MM-DD")}/>
                    </div>
                    <div className={FormStyle.inputGroup}>
                        <label>Completion Date:</label>
                        <input className={FormStyle.input} type="date" value={(new Moment(props.diary.endDate)).format("YYYY-MM-DD")}/>
                    </div>
                </div>
            </div>

            <div className={Style.formOptions}>
                <Link to={props.backUrl} className={ButtonStyle.buttonWarning}><i className="fa fa-times"></i></Link>

                <button className={ButtonStyle.buttonDanger} type="button" onClick={(event) => { props.toggleDeleteConfirmation(); }}>
                <i className="fa fa-trash"></i></button>
            
            
                <button className={ButtonStyle.buttonSuccess} type="submit"><i className="fa fa-check"></i></button>
            </div>   
        </form>
    )
}


export default MobileDiaryConfigForm