// React imports
import React from 'react'
// Style imports
import Style from './help-pages.module.scss'
// Image imports
import ExampleDiarySettings from '../../../../_images/help/diarySettingsExample.png'


const DiarySettings = (props) => (
    <div className={Style.main}>

        <div className={Style.row}>
            <div className={Style.col}>
                <div className={Style.figure}>
                    <img src={ExampleDiarySettings} alt={"Diary settings option location"} />
                    <div className={Style.caption}><label>Desktop/Laptop diary settings option location</label></div>
                </div>
            </div>

            
            <div className={Style.col}>
                <h4>Instructions:</h4>
                <ol>
                   <li>
                       Locate the diary settings button. On desktop/laptop devices, this can be found in the top-right portion of the screen
                       as seen in the top figure on the left. On mobile devices, this can be found...TO BE COMPLETED FOR MOBILE. Click the 
                       button to navigate to the page.
                    </li>
                    <li>
                        A pre-completed form should now be available. A breakdown of each input can be found below. Edit any of the entries
                        and click "Submit Changes" to successfully apply the changes to the diary.
                    </li>
                </ol>

                <h4>Form breakdown:</h4>
                <ul>
                    <li>
                        <b>Diary Name:</b> This is the name of the new diary you are updating.
                    </li>
                    <li>
                        <b>Start Date:</b> This is the date that you want to start recording your drink consumption. This option is unavailable if
                        the status of the diary is already "Active" or "Complete".
                    </li>
                    <li>
                        <b>Completion Date:</b> This is the date that you want to stop recording your drink consumption. This option is unavailable
                        if the status of the diary is "Complete".
                    </li>
                </ul>

            </div>
        </div>
    </div>
)

export default DiarySettings