// React Imports
import React from 'react'
// Style Imports
import Style from './help-modal.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'
// Component Imports
import Modal from "../modal"
import { CreatingDiary, DiarySettings, CreatingDiaryEntry, EditingDiaryEntry } from './help-pages'

class HelpModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            backEnabled: false,
            currentGuide: undefined,
            title: "Help Guide"
        }
    }


    updateSelectedGuide = (guide) => {
        const defaultTitle = "Help Guide"

        var title;
        var selectedGuide;
        var backEnabled = true;

        switch(guide) {
            case "CreatingDiary":
                title = defaultTitle + " - Creating a new diary"
                selectedGuide = CreatingDiary
                break;
            case "UpdatingDiarySettings":
                title = defaultTitle + " - Updating diary settings"
                selectedGuide = DiarySettings
                break;
            case "CreatingDiaryEntry":
                title = defaultTitle + " - Creating a new diary entry"
                selectedGuide = CreatingDiaryEntry
                break;
            case "UpdatingDiaryEntry":
                title = defaultTitle + " - Updating a diary entry"
                selectedGuide = EditingDiaryEntry
                break;
            case "StatusIndicators":
                break;
            case "ChangingPassword":
                break;
            default:
                title = defaultTitle
                selectedGuide = undefined
                backEnabled = false
                break;
        }

        this.setState({title: title, currentGuide: selectedGuide, backEnabled: backEnabled})
    }


    render() {

        const backVis = this.state.backEnabled ? "visible" : "hidden"
        const actions = (
            <div className={Style.modalActions}>
                <div className={Style.left}><button className={ButtonStyle.button} onClick={this.updateSelectedGuide} style={{visibility:backVis}}> 
                <i className="fa fa-arrow-left"></i>Back</button></div>
                <div className={Style.right}><button className={ButtonStyle.button} onClick={this.props.closeModal}>
                Close</button></div>
            </div>
        )

        const HelpMenu = (props) => (
            <div id={Style.helpModal}>
                <p>This help guide aims to provide assistance for any of the actions that can be performed using Drinks Diary. 
                    Below are the help guides available, categorised based on their respective areas.</p>

                <h4>Diary Management</h4>

                <ul className={Style.guideList}>
                    <li className={Style.guideOption} onClick={() => this.updateSelectedGuide("CreatingDiary")}>Creating a new diary...</li>
                    <li className={Style.guideOption} onClick={() => this.updateSelectedGuide("UpdatingDiarySettings")}>Updating the settings for an existing diary...</li>
                    <li className={Style.guideOption} onClick={() => this.updateSelectedGuide("CreatingDiaryEntry")}>Creating a new diary entry...</li>
                    <li className={Style.guideOption} onClick={() => this.updateSelectedGuide("UpdatingDiaryEntry")}>Updating an existing diary entry...</li>
                    <li className={Style.guideOption} onClick={() => this.updateSelectedGuide("StatusIndicators")}>Diary status indicators...</li>
                </ul>

                <h4>Account Management</h4>

                <ul className={Style.guideList}>
                    <li className={Style.guideOption} onClick={() => this.updateSelectedGuide("ChangingPassword")}>Changing your password...</li>
                </ul>
            </div>
        )
    
        const Display = !this.state.currentGuide ? HelpMenu : this.state.currentGuide
        return(
            <Modal title={this.state.title} actions={actions} onClose={this.props.closeModal} size={"large"}>
                <Display />
            </Modal>
        )    
    }
}


export default HelpModal
