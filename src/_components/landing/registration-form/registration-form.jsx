// React imports
import React from 'react'
// Router imports
import { Link , withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { MessageTypes } from '../../../_helpers/enums';
import { clearErrorState } from '../../../_redux/actions/app.actions'
import { flashMessage } from '../../../_redux/actions/message-flash.actions'
import { submitRegistrationRequest } from '../../../_redux/actions/user.actions'
// Service imports
import { register } from '../../../_services/users.service'
// Component imports 
import MessageFlash from '../../message-flash'
// Style imports 
import Style from './registration-form.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../../_helpers/style-utility/form-control.module.scss'


class ResponseError extends Error {
    constructor(info) {
        super()
        this.info = info
    }
}


class RegistrationForm extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            email: "", 
            forename: "", surname: "", gender: "", dob: "", 
            password: "", cPassword: ""
        }
    }

    onChangeInput = (event, key) => {
        var newState = {}
        newState[key] = event.target.value
        this.setState(newState)
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    passwordValidation = () => {
        var validationMessage;
        var regex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
        
        if (this.state.password.length < 6 || this.state.password.length > 72) {
            validationMessage = "Passwords must be between 6 and 72 characters long."
        } else if (!regex.test(this.state.password)) {
            validationMessage = "Password contains invalid characters."
        } else if (this.state.password !== this.state.cPassword) {
            validationMessage = "Passwords do not match, please re-enter the confirmation password."
        }

        return {isValid: (validationMessage !== "") ,message: validationMessage};        
    }

    onSubmit = (event) => {
        event.preventDefault()

        // Validate form inputs
        var validationMessage;
        const passwordValidation = this.passwordValidation();
        if (passwordValidation.isValid) {
            validationMessage = passwordValidation.message
        } 
        
        // Flash validation message if validation failed
        if (validationMessage) {
            this.props.flashMessage(validationMessage, MessageTypes.warning)
            return
        }
        
        // Submit registration request to API
        register({...this.state, dob: new Date(this.state.dob).toISOString()})
            .then( (response) => {
                if (response.error) { throw new ResponseError(response.response.error) }
                this.props.history.push("/")
            })
            .catch( (error) => {
                // Handle response errors
                switch(error.info.type) {
                    case "ValidationError":
                        const message = `Field ${error.info.errors[0].field} failed validation checks. Please check input.` 
                        this.props.flashMessage(message, MessageTypes.error)
                        break;
                }
            })
    }

    render() {
        return (
            <div id={Style.registrationForm}>
                
                <h3>Register an account...</h3>
                <MessageFlash />

                <form onSubmit={(event) => this.onSubmit(event)}>
                    
                    <div className={FormStyle.inputGroup}>
                        <label>E-mail Address</label>
                        <input type="email" className={FormStyle.input} placeholder="john.smith@example.com" value={this.state.email}
                        onChange={(event) => this.onChangeEmail(event)} />
                    </div>

                    <div className={FormStyle.inputRow}>
                        <div className={FormStyle.inputGroup}>
                            <label>Forename</label>
                            <input type="text" className={FormStyle.input} placeholder="forename..." value={this.state.forename} 
                            onChange={(event) => this.onChangeInput(event, "forename")} />
                        </div>
                        
                        <div className={FormStyle.inputGroup}>
                            <label>Surname</label>
                            <input type="text" className={FormStyle.input} placeholder="surname..." value={this.state.surname} 
                            onChange={(event) => this.onChangeInput(event, "surname")} />
                        </div>
                    </div>

                    <div className={FormStyle.inputRow}>
                        <div className={FormStyle.inputGroup}>
                            <label>Date of Birth</label>
                            <input type="date" className={FormStyle.input} value={this.state.dob} 
                            onChange={(event) => this.onChangeInput(event, "dob")} />
                        </div>
                        
                        <div className={FormStyle.inputGroup}>
                            <label>Gender</label>
                            <select type="text" className={FormStyle.input} value={this.state.gender} 
                            onChange={(event) => this.onChangeInput(event, "gender")} >
                                <option value="" disabled>- Select a gender -</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className={FormStyle.inputGroup}>
                        <label>Password</label>
                        <input type="password" className={FormStyle.input} placeholder="password..." value={this.state.password} 
                        onChange={(event) => this.onChangePassword(event)} />
                    </div>

                    <div className={FormStyle.inputGroup}>
                        <label>Confirm Password</label>
                        <input type="password" className={FormStyle.input} placeholder="confirm password..." value={this.state.cPassword}
                        onChange={(event) => this.onChangeInput(event, "cPassword")} />
                    </div>


                    <div className={Style.formOptions}>
                        <Link to="/" className={ButtonStyle.buttonWarningSM}>Cancel <i className="fas fa-user-times"></i></Link>
                        <button type="submit" className={ButtonStyle.buttonSuccessSM}>Create Account <i className="fas fa-sign-in-alt"></i></button>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.app.errorState
})

const mapDispatchToProps = (dispatch) => {
    return {
        flashMessage: (message, type) => {
            dispatch(flashMessage(message, type))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm))