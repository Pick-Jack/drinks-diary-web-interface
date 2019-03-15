// React imports
import React from 'react'
// Router imports
import { Link , withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { submitRegistrationRequest } from '../../_redux/actions/user.actions'
// Style imports 
import Style from './registration-form.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../_helpers/style-utility/form-control.module.scss'


class RegistrationForm extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            forename: "",
            surname: "",
            gender: "",
            dob: "",
            password: "",
            cPassword: ""
        }
    }
    
    onChangeInput = (event, key) => {
        var newState = {}
        newState[key] = event.target.value
        this.setState(newState)
    }

    onChangeEmail = (event) => {
        // TODO: email validation
        this.setState({email: event.target.value})
    }

    onChangePassword = (event) => {
        // TODO: password validation
        this.setState({password: event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault()

        // Convert date string to object
        var dob = new Date(this.state.dob).toISOString()
        this.props.submitRegistrationRequest({...this.state, dob})
        this.props.history.push("/")
    }

    render() {
        return (
            <div id={Style.registrationForm}>
                
                <h3>Register an account...</h3>

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

const mapDispatchToProps = (dispatch) => {
    return {
        submitRegistrationRequest: (args) => {
            dispatch(submitRegistrationRequest(args))
        },
    }
}

export default withRouter(connect(null, mapDispatchToProps)(RegistrationForm));