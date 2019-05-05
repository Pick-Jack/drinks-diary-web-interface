// React imports
import React from 'react'
// Router imports
import { Link } from 'react-router-dom'
// Component imports
import DeleteDiaryModal from './delete-diary-modal'
// Style Imports
import Style from './diary-configuration-form.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../../_helpers/style-utility/form-control.module.scss'
import * as Moment from 'moment'


const DesktopDiaryConfigForm = (props) => {
    return ( 
        <form id={Style.DesktopConfigForm} onSubmit={() => props.updateDiaryConfiguration()}>
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
                <div className={Style.left}>
                    <Link to={props.backUrl} className={ButtonStyle.buttonWarning}><i className="fa fa-times"></i>Cancel</Link>
                    <button className={ButtonStyle.buttonDanger} onClick={(event) => { event.preventDefault(); props.toggleDeleteConfirmation(); }}>
                    <i className="fa fa-trash"></i> Delete Diary</button>
                </div>
                <div className={Style.right}>
                    <button className={ButtonStyle.buttonSuccess}><i className="fa fa-check"></i> Submit Changes</button>
                </div>
            </div>

            { 
                // Modal for warning prior to deleting an entry
                props.deleteModal &&
                <DeleteDiaryModal onToggleModal={props.toggleDeleteConfirmation} onDeleteEntry={props.onDeleteEntry} />
            }
            
        </form>
    )
}


export default DesktopDiaryConfigForm

