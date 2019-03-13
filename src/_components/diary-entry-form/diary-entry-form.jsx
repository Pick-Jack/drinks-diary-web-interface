// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../_redux/actions/nav-options.actions';
// Component Imports 
import VolumeSelector from '../volume-selector';
// Style Imports
import Style from './diary-entry-form.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss';
import FormStyle from '../../_helpers/style-utility/form-control.module.scss';


class CreateDiaryEntry extends React.Component {
    constructor(props) {
        super(props)

        this.props.setNavOptions([
            (<Link to={`/diary/${this.props.match.params.id}`}><i className="fa fa-arrow-left"></i> Back</Link>),
        ])
    }

    render() {
        return(
            <form id={Style.createDiaryEntry}>
                <h3>Create Diary Entry</h3>
                
                <div className={Style.formMain}>
                    <img  />

                    <div className={Style.inputs}>

                        <div className={FormStyle.inputGroup}>
                            <label>Drink:</label>
                            <input className={FormStyle.input} type="text" placeholder="drink name..." value="" />
                        </div>
                        
                        <div className={FormStyle.inputGroup}>
                            <label>Volume:</label>
                            <VolumeSelector />
                        </div>

                        <div className={FormStyle.inputRow}>
                            <div className={FormStyle.inputGroup}>
                                <label>Contains Alcohol:</label>
                                <select className={FormStyle.input} value="">
                                    <option value="" selected disabled>-- select an option --</option>
                                    <option value={false}>Non-alcoholic</option>
                                    <option value={true}>Alcoholic</option>
                                </select>
                            </div>

                            <div className={FormStyle.inputGroup}>
                                <label>Contains Caffeine:</label>
                                <select className={FormStyle.input} value="">
                                    <option value="" selected disabled>-- select an option --</option>
                                    <option value={false}>Decaf</option>
                                    <option value={true}>Caffeinated</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className={Style.formOptions}>
                    <Link to={`/diary/${this.props.match.params.id}`} className={ButtonStyle.buttonWarningSM}>Cancel</Link>
                    <button type="submit" className={ButtonStyle.buttonSuccessSM}>Create Entry</button>
                </div>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CreateDiaryEntry))

