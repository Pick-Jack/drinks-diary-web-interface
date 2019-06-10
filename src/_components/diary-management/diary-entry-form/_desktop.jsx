// React Imports
import React from 'react';
// Router imports 
import { Link } from 'react-router-dom';
// Component Imports 
import DeleteEntryModal from './delete_modal';
import VolumeSelector from '../../volume-selector';
// Style Imports
import Style from './diary-entry-form.module.scss';
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../../_helpers/style-utility/form-control.module.scss';
// Image imports
import DefaultDrink from '../../../_images/default_drink.svg'

const DesktopEntryForm = (props) => {

    return (
            <form id={Style.desktopEntryForm} onSubmit={(event) => {event.preventDefault(); props.onSubmit()}}>
                
                <div className={Style.entryRow}>
                    
                    {/* Input column 1*/}
                    <div className={Style.entryCol}>
                        <img className={Style.entryThumbnail} src={DefaultDrink} alt={"Drink Thumbnail"} />

                        <div className={FormStyle.inputGroup}>
                            <label>Consumption Time:</label>
                            <input className={FormStyle.input} type="time" value={props.formValues.time} 
                            onChange={(event) => props.onChange("time", event.target.value)} required />
                        </div>

                        <div className={FormStyle.inputGroup}>
                            <label>Drink Name:</label>
                            <input className={FormStyle.input} type="text" placeholder="drink name..." 
                            value={props.formValues.drinkName} onChange={(event) => props.onChange("drinkName", event.target.value)} required />
                        </div>
                    </div>
                    
                    {/* Input column 2*/}
                    <div className={Style.entryCol}>
                        <div className={FormStyle.inputGroup}>
                            <label>Brand (Optional):</label>
                            <input className={FormStyle.input} type="text" placeholder="brand..." 
                            value={props.formValues.brand} onChange={(event) => props.onChange("brand", event.target.value)} />
                        </div>

                        <div className={FormStyle.inputGroup}>
                            <label>Volume:</label>
                            <VolumeSelector onChange={(newState) => props.onChange("volume", newState) } required={true} 
                            volume={props.formValues.volume.value} measure={props.formValues.volume.measure} />
                        </div>
                    
                        <div className={FormStyle.inputGroup}>
                            <label>Caffeine Content:</label>
                            <input className={FormStyle.input} type="number" placeholder="caffeine content..."  
                            value={props.formValues.caffeineContent} onChange={(event) => props.onChange("caffeineContent", event.target.value)} />
                        </div>

                        <div className={FormStyle.inputGroup}>
                            <label>Alcohol Percentage:</label>
                            <input className={FormStyle.input} type="number" placeholder="alcohol percentage..."  
                            value={props.formValues.alcoholPercentage} onChange={(event) => props.onChange("alcoholPercentage", event.target.value)} />
                        </div>
                    </div>
                </div>


                <div className={Style.formActions}>
                    <div className={Style.left}>
                        <Link to={`/diary/${props.diaryId}`} className={ButtonStyle.buttonWarning}>
                        <i className="fa fa-times"></i> Cancel</Link>
                        {
                            props.activeEntry &&
                            <button type="button" className={ButtonStyle.buttonDanger} onClick={props.onToggleDelete}>
                            <i className="fa fa-trash"></i> Delete Entry</button>
                        }
                    </div>
                    <div className={Style.right}>
                        <button type="submit" className={ButtonStyle.buttonSuccess}>
                            { !props.activeEntry && (<div><i className="fa fa-plus"></i> Create Entry</div>) }
                            { props.activeEntry && (<div><i className="fa fa-check"></i> Submit Changes</div>) }
                        </button>
                    </div>
                </div>
    

                { 
                    // Modal for warning prior to deleting an entry
                    props.displayDelete &&
                    <DeleteEntryModal onToggleModal={props.onToggleDelete} onDelete={props.onDelete} />
                }
            </form>
    )
}

export default DesktopEntryForm