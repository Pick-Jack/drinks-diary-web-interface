// React Imports
import React from 'react';
import { Link } from 'react-router-dom';
// Redux imports 
import { connect } from 'react-redux';
// Component Imports 
import VolumeSelector from '../volume-selector';
// Style Imports
import Style from './diary-entry-form.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../_helpers/style-utility/form-control.module.scss';


class EntryForm extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {}
        if (this.props.state) {
            this.state = {...this.state, ...this.props.state}
        } else {
            this.state.drinkName = ""    
            this.state.alcoholic = ""
            this.state.caffeinated = ""
            this.state.volume = {amount: "", measurement: ""}
        }
    }

    onChangeInput = (event, key) => {
        var newState = {}
        newState[key] = event.target.value
        this.setState(newState)
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state)
    }

    render() {
        return(
            <form id={Style.diaryEntryForm} onSubmit={(event) => this.onSubmit(event)}>
                <h3>{this.props.formTitle}</h3>
                
                <div className={Style.formMain}>
                    <img  />

                    <div className={Style.inputs}>
                        <div className={FormStyle.inputGroup}>
                            <label>Drink:</label>
                            <input className={FormStyle.input} type="text" placeholder="drink name..." value={this.state.drinkName} 
                            onChange={(event) => this.onChangeInput(event, "drinkName")} />
                        </div>
                        
                        <div className={FormStyle.inputGroup}>
                            <label>Volume:</label>
                            <VolumeSelector onChange={this.onChangeInput} value={this.state.volume} />
                        </div>

                        <div className={FormStyle.inputRow}>
                            <div className={FormStyle.inputGroup}>
                                <label>Contains Alcohol:</label>
                                <select className={FormStyle.input} value={this.state.alcoholic} 
                                onChangeInput={(event) => this.onChangeInput(event, "alcoholic")}>
                                    <option value="" disabled>-- select an option --</option>
                                    <option value={false}>Non-alcoholic</option>
                                    <option value={true}>Alcoholic</option>
                                </select>
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Contains Caffeine:</label>
                                <select className={FormStyle.input} value={this.state.caffeinated} 
                                onChangeInput={(event) => this.onChangeInput(event, "caffeinated")}>
                                    <option value="" disabled>-- select an option --</option>
                                    <option value={false}>Decaf</option>
                                    <option value={true}>Caffeinated</option>
                                </select>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className={Style.formOptions}>
                    <Link to={`/diary/${this.props.match.params.id}`} className={ButtonStyle.buttonWarningSM}><i className="fa fa-times"></i> Cancel</Link>
                    <button type="submit" className={ButtonStyle.buttonSuccessSM}><i className="fa fa-plus"></i> Create Entry</button>
                </div>
            </form>
        )
    }
}

export default EntryForm
