// React imports
import React from 'react'
// Style imports
import Style from './help-pages.module.scss'
// Image imports
import EditEntryExample from '../../../../_images/help/editEntryExample.png'


const EditingDiaryEntry = (props) => (
    <div className={Style.main}>

        <div className={Style.row}>
            <div className={Style.col}>
                <div className={Style.figure}>
                    <img src={EditEntryExample} alt={"Create diary entry option location"} />
                    <div className={Style.caption}><label>Desktop/Laptop diary entry edit option location</label></div>
                </div>
            </div>

            
            <div className={Style.col}>
                <h4>Instructions:</h4>
                <ol>
                   <li>
                        Diary entries can be expanded to reveal more information and the "Edit" option. Navigate to the Diary Log and click on an
                        existing entry, the entry should expand revealing more content.
                   </li>
                   <li>
                       To edit the entry, click on "Edit" and an form identical to the one used to create the entry should appear pre-completed.
                   </li>
                   <li>
                       Update any of the fields you wish to change and press "Submit Changes". This will finalise the update and apply any changes you
                       have made. A breakdown of each of the fields can be found below.
                   </li>
                </ol>

                <h4>Form breakdown:</h4>
                <ul>
                    <li>
                        <b>Drink Name:</b> You should input the name of the drink here, for example "Black Coffee", "Orange Juice", "Old Fashioned" etc.
                    </li>
                    <li>
                        <b>Brand:</b>  This is an optional field you should only complete when you know the brand of the drink you have consumed. If there
                        if no known brand then leave blank.
                    </li>
                    <li>
                        <b>Volume: </b> The first field should be completed with a number representing the amount of the selected volume has been consumed.
                        The second field is a selection of volumes available to choose. For example, if you had consumed a large cup of Coffee you would
                        select "Large Mug" from the volume selection field, and input "1" in the amount field.
                    </li>
                    <li>
                        <b>Contains Caffeine:</b> Choose "Decaf" if the drink does not contain caffeine, otherwise choose "Caffeinated". Choosing Caffeinated
                        will enable the "Caffeine Content" field.
                    </li>
                    <li>
                        <b>Caffeine Content: </b> This is an optional field. You should only input a value if you know the measurement of caffeine in the drink.
                        This field uses milligrams (mg) as the unit.
                    </li>
                    <li>
                        <b>Contains Alcohol: </b> Choose "Non-Alcoholic" if the drink does not contain alcohol, otherwise choose "Alcoholic". Choosing Alcoholic
                        will enable the "Alcohol Percentage" field.
                    </li>
                    <li>
                        <b>Alcohol Percentage: </b> This is an optional field. You should only input a value if you know the ABV for the consumed drink. This is 
                        typically provided as a percentage on the bottle or can and is the value you should input here. 
                    </li>
                </ul>

            </div>
        </div>
    </div>
)

export default EditingDiaryEntry