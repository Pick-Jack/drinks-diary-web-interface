import React, { Component } from 'react'
import Style from './volume-selector.module.scss'


class VolumeSelector extends Component {

    render() {
        return (
            <div> 
                <label>{this.props.label}</label>
                <div className={Style.volumeSelector}>
                    <input type="number" min="1" />
                    <select>
                        <option value="cup">Cup(s)</option>
                        <option value="ml">Milliliters</option>
                        <option value="oz">Ounces</option>
                    </select>
                </div>
            </div>
        )
    }

}

export default VolumeSelector