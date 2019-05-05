// React imports
import React from 'react'
// Style imports
import Style from './help-pages.module.scss'
// Image imports
import ExampleDiaryList from '../../../../_images/help/diaryListExample.png'



const CreatingDiary = (props) => (
    <div className={Style.main}>

        <div className={Style.row}>
            <div className={Style.col}>
                <div className={Style.figure}>
                    <img src={ExampleDiaryList} alt={"Example of diary list"} />
                    <div className={Style.caption}><label>Example list of existing drinks diaries.</label></div>
                </div>
            </div>

            
            <div className={Style.col}>
                <h4>Instructions:</h4>
                <ol>
                    <li>
                        First locate the list of existing diaries. On a desktop/laptop browser this is found on the left side of your screen.
                        On mobile this is the list of entries on the home screen. 
                    </li>
                    <li>
                        Click the "Create Diary" button found at the top of the list on desktop/laptop devices and the bottom of the list on mobile devices.
                    </li>
                    <li>
                        A form should now be displayed allowing you to create a new diary. Once you have completed each of the options, press submit and you will
                        have successfully created a new diary. The form breakdown explains each available option.
                    </li>
                    <li>
                        You can now access the diary by selecting it from the list of existing diaries.
                    </li>
                </ol>

                <h4>Form breakdown:</h4>
                <ul>
                    <li>
                        <b>Study Enrolment Option:</b> Choosing one of these options creates a diary using the settings defined by the selected study.
                        Creating a diary with one of these options will enroll you onto the study. Only studies you have been assigned will be available
                        in this list.
                    </li>
                    <li>
                        <b>Diary Name:</b> This is the name of the new diary you are creating.
                    </li>
                    <li>
                        <b>Start Date:</b> This is the date that you want to start recording your drink consumption.
                    </li>
                    <li>
                        <b>End Date:</b> This is the date that you want to stop recording your drink consumption.
                    </li>
                </ul>

            </div>
        </div>
    </div>
)

export default CreatingDiary