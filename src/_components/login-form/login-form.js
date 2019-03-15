// React imports
import React from 'react'
// Redux imports
import { connect } from 'react-redux'
import { submitLoginRequest } from '../../_redux/actions/user.actions'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Style imports
import Style from './login-form.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../_helpers/style-utility/form-control.module.scss'


class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
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

const mapDispatchToProps = (dispatch) => {
    return {
        submitLoginRequest: (email, password) => {
            dispatch(submitLoginRequest(email, password))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))