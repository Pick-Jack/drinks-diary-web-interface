// React imports
import React from 'react'
// Redux imports
import { connect } from 'react-redux'
import { MessageTypes } from '../../../_helpers/enums';
import { clearErrorState } from '../../../_redux/actions/app.actions'
import { submitLoginRequest } from '../../../_redux/actions/user.actions'
import { flashMessage } from '../../../_redux/actions/message-flash.actions'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Component imports 
import MessageFlash from '../../message-flash'
// Style imports
import Style from './login-form.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../../_helpers/style-utility/form-control.module.scss'



class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { email: "", password: "" }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.error && prevProps.error != this.props.error) {
            switch(this.props.error.code) {
                case 500:
                    throw new Error()
                case 401: default: 
                    const message =  "Failed to validate credentials, check username or password"
                    this.props.flashMessage(message, MessageTypes.error)
                    break;
            }
            this.props.clearErrorState()
        }
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault()
        // TODO: Account enumeration prevention
        this.props.submitLoginRequest(this.state.email, this.state.password)
    }

    render() {
        return (
            <div id={Style.loginForm}>
                <h3>Welcome...</h3>
                <h5>Sign in or register an account today.</h5>

                <MessageFlash />

                <form onSubmit={(event) => this.onSubmit(event)}>
                    <div className={FormStyle.inputGroup}>
                        <label>E-mail Address</label>
                        <input type="email" className={FormStyle.input} placeholder="john.smith@example.com" value={this.state.email} 
                        onChange={(event) => this.onChangeEmail(event)} />
                    </div>

                    <div className={FormStyle.inputGroup}>
                        <label>Password</label>
                        <input type="password" className={FormStyle.input} placeholder="password..." value={this.state.password} 
                        onChange={(event) => this.onChangePassword(event)} />
                    </div>

                    <div className={Style.formOptions}>
                        <Link to="/register" className={ButtonStyle.buttonWarningSM}>Register <i className="fas fa-user-plus"></i></Link>
                        <button type="submit" className={ButtonStyle.buttonSuccessSM}>Login <i className="fas fa-sign-in-alt"></i></button>
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
        submitLoginRequest: (email, password) => {
            dispatch(submitLoginRequest(email, password))
        },
        flashMessage: (message, type) => {
            dispatch(flashMessage(message, type))
        },
        clearErrorState: () => {
            dispatch(clearErrorState())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))