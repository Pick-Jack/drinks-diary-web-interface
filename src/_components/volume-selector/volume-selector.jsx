import React, { Component } from 'react'
import Style from './volume-selector.module.scss'


class VolumeSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            volume: this.props.volume, 
            measurement: this.props.measurement,
            measurementOptions: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                volume: this.props.volume,
                measurement: this.props.measurement
            })
        }
    }

    componentDidMount() {
        // TODO: API call to retrieve measurements
        const measurements = [
            {value: "cup", display: "Cup(s)"},
            {value: "ml", display: "Milliliters"},
            {value: "oz", display: "Ounces"},
        ]
        
        var measurementOptions = measurements.map((option, index) => (
            <option key={index} value={option.value}>{option.display}</option>
        )) 

        this.setState({measurementOptions})
    }

    onChangeVolume = (event) => {
        const newVolState = {...this.state.formValues, value: event.target.value}
        this.setState({formValues: newVolState})
        if (this.props.onChange) { this.props.onChange(newVolState) }
    }

    onChangeMeasure = (event) => {
        const newVolState = {...this.state.formValues, measure: event.target.value}
        this.setState({formValues: newVolState})
        if (this.props.onChange) { this.props.onChange(newVolState) }
    }

    render() {
        return (
            <div> 
                <label>{this.props.label}</label>
                <div className={Style.volumeSelector}>
                    <input type="number" min="1" placeholder={"volume..."}
                    required={this.props.required ? this.props.required : false} value={this.state.volume} 
                    onChange={(event) => this.onChangeVolume(event)} />
                    <select value={this.state.measurement} onChange={(event) => this.onChangeMeasure(event)} >
                        {this.state.measurementOptions}
                    </select>
                </div>
            </div>
        )
    }

}

export default VolumeSelector