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
        
        this.state = {
            drinkName: "",
            alcoholic: "",
            caffeinated: "",
            volume: {amount: "", measure: ""}
        }   
    }

    componentDidMount() {
        if (this.props.formValues) {
            this.setState({
                drinkName: this.props.formValues.drinkType,
                alcoholic: this.props.formValues.alcoholic,
                caffeinated: this.props.formValues.caffeinated,
                volume: {
                    amount: this.props.formValues.volume.amount, 
                    measure: this.props.formValues.volume.measure
                }
            })
        }
    }

    onChangeInput = (event, key) => {
        var newState = {}
        newState[key] = event.target.value
        this.setState(newState)
    }

    onChangeVolume = (newState) => {
        this.setState({volume: newState})
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
                            onChange={(event) => this.onChangeInput(event, "drinkName")} required />
                        </div>
                        
                        <div className={FormStyle.inputGroup}>
                            <label>Volume:</label>
                            <VolumeSelector 
                                onChange={this.onChangeVolume} 
                                volume={this.state.volume.amount}
                                measurement={this.state.volume.measure} 
                                required={true} 
                            />
                        </div>

                        <div className={FormStyle.inputRow}>
                            <div className={FormStyle.inputGroup}>
                                <label>Contains Alcohol:</label>
                                <select className={FormStyle.input} value={this.state.alcoholic} 
                                onChange={(event) => this.onChangeInput(event, "alcoholic")}>
                                    <option value="" disabled>-- select an option --</option>
                                    <option value={false}>Non-alcoholic</option>
                                    <option value={true}>Alcoholic</option>
                                </select>
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Contains Caffeine:</label>
                                <select className={FormStyle.input} value={this.state.caffeinated} 
                                onChange={(event) => this.onChangeInput(event, "caffeinated")}>
                                    <option value="" disabled>-- select an option --</option>
                                    <option value={false}>Decaf</option>
                                    <option value={true}>Caffeinated</option>
                                </select>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className={Style.formOptions}>
                    {this.props.formOptions}
                </div>
            </form>
        )
    }
}

export default EntryForm
