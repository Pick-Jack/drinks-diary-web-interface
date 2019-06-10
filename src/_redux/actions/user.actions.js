import { login, register, checkAuthorisation, getAccountDetails } from '../../_services/users.service';
import { flashMessage } from './message-flash.actions';
import { MessageTypes } from '../../_helpers/enums';
import { store } from '../store'


const sessionExpiredMessage = "Account session expired."
const failedLoginMessage = "Login failed. Username and Password does not exist."


export function submitLoginRequest(email, password) {
    return async dispatch => {
        try {
            // Submit request to API to verify credentials
            const response = await login(email, password)
            if (!response.error) {
                // Save response body containing token to local storage
                localStorage.setItem('authToken', response.response.authToken)
                dispatch ({type: "LOGIN-SUCCESS", payload: response.response.authToken})
            } 
            else { throw response.response }
        }
        catch(error) {
            // TODO: log and handle error
            // TODO: Redirect server error page
            console.log(error)
            dispatch ({type: "LOGIN-FAILED"})
        }
    }
}


export function checkAuth(authToken) {
    return async dispatch => {
        try{
            const response = await checkAuthorisation(authToken)
            if (response.status === 200 && !store.getState().user.displayName) {
                // Retrieve user details from the database
                const detailsResponse = await getAccountDetails(authToken)
                dispatch ({type: "SET-USER-ID", payload: detailsResponse.response._id})
                dispatch ({type: "SET-DISPLAY-NAME", payload: detailsResponse.response.forename})
            }
            else if (response.status !== 200) {
                throw new Error("Failed auth")
            }
        }
        catch (error) {
            // Treat as check failed for security reasons
            // TODO: log error
            localStorage.removeItem('authToken')
            flashMessage(sessionExpiredMessage)
            dispatch({type: "AUTHENTICATION-FAILED"})
        }
        
    }
}


export function logOut() {
    localStorage.removeItem('authToken')
    return {type: "LOG-OUT"}
}

