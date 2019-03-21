import { login, register, checkAuthorisation } from '../../_services/users.service';
import { flashMessage } from './message-flash.actions';
import { MessageTypes } from '../../_helpers/enums';


const sessionExpiredMessage = "Account session expired."
const failedLoginMessage = "Login failed. Username and Password does not exist."


export function submitLoginRequest(email, password) {
    return async dispatch => {
        try {
            // Submit request to API to verify credentials
            const response = await login(email, password)
            if (response.status === 200) {
                // Save response body containing token to local storage
                const responseBody = await response.json()
                localStorage.setItem('authToken', responseBody.authToken)
                dispatch ({type: "LOGIN-SUCCESS", payload: responseBody.authToken})
            } else if (response.status !== 200 && response.status !== 500) {
                flashMessage(failedLoginMessage, MessageTypes.error)
                dispatch ({type: "LOGIN-FAILED"})
            } else {
                throw new Error()
            }
        }
        catch(error) {
            // TODO: log and handle error
            // TODO: Redirect server error page
            dispatch ({type: "LOGIN-FAILED"})
        }
    }
}


export function submitRegistrationRequest(args) {
    return dispatch => {
        register(args).then(
            response => {
                if (response.code == 200) {
                    dispatch({type: "REGISTRATION_SUCCESSFUL"})
                }
            },
            error => {
                throw error
            }
        )
    }
}


export function checkAuth(authToken) {
    return dispatch => {
        checkAuthorisation(authToken)
            .then(response => {
                if (response.status !== 200) {
                    // Check failed so change state
                    localStorage.removeItem('authToken')
                    flashMessage(sessionExpiredMessage)
                    dispatch({type: "AUTHENTICATION-FAILED"})
                }
            })
            .catch(error => {
                // Treat as check failed for security reasons
                // TODO: log error
                localStorage.removeItem('authToken')
                flashMessage(sessionExpiredMessage)
                dispatch({type: "AUTHENTICATION-FAILED"})
            })
    }
}


export function logOut() {
    localStorage.removeItem('authToken')
    return {type: "LOG-OUT"}
}

