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
            volume: {amount: "", measurement: ""}
        }   
    }

    componentDidMount() {
        console.log(this.props.state)
        if (this.props.state) {
            this.setState = {...this.props.state}
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
        console.log(this.state)
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
                            <VolumeSelector onChange={this.onChangeVolume} value={this.state.volume} required={true} />
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
                    <Link to={`/diary/${this.props.diaryId}`} className={ButtonStyle.buttonWarningSM}><i className="fa fa-times"></i> Cancel</Link>
                    <button type="submit" className={ButtonStyle.buttonSuccessSM}><i className="fa fa-plus"></i> Create Entry</button>
                </div>
            </form>
        )
    }
}

export default EntryForm
