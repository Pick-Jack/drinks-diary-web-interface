// React imports
import React, { Component } from 'react'
// Redux imports
import { connect } from 'react-redux'
// Service imports
import { getSupportedVolumes } from '../../_services/diary.service'
// Style imports
import Style from './volume-selector.module.scss'


class VolumeSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            measurementOptions: []
        }
    }

    componentDidMount() {
        // Retrieve supported volumes from the API
        getSupportedVolumes(this.props.authToken)
            .then(response => {
                if(response.error) { throw response.response }
                const results = response.response.results

                var measurementOptions = {}
                for(var i = 0; i < results.length; i++) {
                    const option = results[i]

                    // Initialise option list for new group
                    if (Object.keys(measurementOptions).indexOf(option.group) < 0) {    
                        measurementOptions[option.group] = [(
                            <option key={option.group} disabled>{`-- ${option.group} --`}</option>
                        )]
                    }
                    
                    // Add option to group
                    measurementOptions[option.group].push((
                        <option key={option.key} value={option.key}>{option.title}</option>
                    ))
                }

                // Concatenate the groups to a single options list
                var optionsList = []
                for(var i = 0; i < Object.keys(measurementOptions).length; i++) {
                    var key = Object.keys(measurementOptions)[i]
                    optionsList = optionsList.concat(measurementOptions[key])
                }

                this.setState({measurementOptions: optionsList})

                // Simulate user selection for to pre-select first option
                const event = {}
                event.target = {}
                event.target.value = results[0].key
                this.props.onChange(event, "measure")
            })
            .catch(error => {
                console.log(`Error fetching volumes: ${error.message}`)
            })
    }

    render() {
        return (
            <div> 
                <label>{this.props.label}</label>
                <div className={Style.volumeSelector}>

                    <input type="number" min="1" placeholder={"value..."}
                    required={this.props.required ? this.props.required : false} value={this.props.volume} 
                    onChange={(event) => this.props.onChange(event, "value")} />

                    <select value={this.props.measure} onChange={(event) => this.props.onChange(event, "measure")} >
                        {this.state.measurementOptions}
                    </select>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authToken: state.user.authToken
})

export default connect(mapStateToProps)(VolumeSelector)