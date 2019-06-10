// React Imports
import React from 'react';
// Router imports 
import { Link } from 'react-router-dom';
// Component Imports 
//import DeleteEntryModal from './delete-entry-modal'
import VolumeSelector from '../../volume-selector';
// Style Imports
import Style from './diary-entry-form.module.scss';
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../../_helpers/style-utility/form-control.module.scss';


const MobileEntryForm = (props) => {
    return (
        <form id={Style.mobileEntryForm} onSubmit={(event) => {event.preventDefault(); props.onSubmit();}}>
            
            <div className={Style.section}>
                <img className={Style.entryThumbnail} />

                <div className={FormStyle.inputGroup}>
                    <label>Consumption Time:</label>
                    <input className={FormStyle.input} type="time" value={props.formValues.time} 
                    onChange={(event) => props.onChange("time", event.target.value)} required />
                </div>
            </div>
            
            
            

            {/* General drink entry details: name, brand, volume*/}
            <div className={Style.section}>

                <div className={FormStyle.inputGroup}>
                    <label>Drink Name:</label>
                    <input className={FormStyle.input} type="text" 
                    placeholder="drink name..." value={props.formValues.drinkName} 
                    onChange={(event) => props.onChange("drinkName", event.target.value)} required />
                </div>

                <div className={FormStyle.inputGroup}>
                    <label>Brand (Optional):</label>
                    <input className={FormStyle.input} type="text" 
                    placeholder="brand..." value={props.formValues.brand} 
                    onChange={(event) => props.onChange("brand",event.target.value)} />
                </div>

                <div className={FormStyle.inputGroup}>
                    <label>Volume:</label>
                    <VolumeSelector onChange={(newState) => props.onChange("volume", newState) } required={true} 
                    volume={props.formValues.volume.value} measure={props.formValues.volume.measure} />
                </div>
            </div>

            {/* Alcohol Percentage and Caffeine content*/}
            <div className={Style.section}>
                <div className={FormStyle.inputGroup}>
                    <label>Caffeine Content:</label>
                    <input className={FormStyle.input} type="number"
                    placeholder="caffeine content..."  value={props.formValues.caffeineContent} 
                    onChange={(event) => props.onChange("caffeineContent", event.target.value)} />
                </div>

                <div className={FormStyle.inputGroup}>
                    <label>Alcohol Percentage:</label>
                    <input className={FormStyle.input} type="number"
                    placeholder="alcohol percentage..."  value={props.formValues.alcoholPercentage} 
                    onChange={(event) => props.onChange("alcoholPercentage", event.target.value)} />
                </div>
            </div>


            {/* Form actions */}                        
            <div className={Style.formActions}>
                <Link to={`/diary/${props.diaryId}`} className={ButtonStyle.buttonWarning}>
                <i className="fa fa-times"></i></Link>
                
                { 
                    props.activeEntry &&
                    <button type="button" className={ButtonStyle.buttonDanger} onClick={props.onToggleDelete}>
                    <i className="fa fa-trash"></i></button>
                }


                <button type="submit" className={ButtonStyle.buttonSuccess}>
                    { !props.activeEntry && (<div><i className="fa fa-plus"></i></div>) }
                    { props.activeEntry && (<div><i className="fa fa-check"></i></div>) }
                </button>
            </div>
        </form>
    )
}

export default MobileEntryForm

