import { login, register } from '../../_services/users.service';


export function submitLoginRequest(email, password) {
    
    return dispatch => {
        // Submit request to API to verify credentials
        login(email, password).then(
            response => {
                if (response.code == 200) {   
                    // Store user authentication details to browser local storage for persistence
                    localStorage.setItem('user', JSON.stringify({
                        email,
                        authToken: response.authToken
                    }));

                    dispatch ({
                        type: "LOGIN-SUCCESS",
                        payload: { authToken: response.authToken }
                    })
                }
                else {    
                    // TODO: display message
                    dispatch ({
                        type: "LOGIN-FAILED"
                    })
                }
            },
            error => {
                dispatch ({
                    type: "LOGIN-FAILED"
                })
                // TODO: display message
                throw error
            }
        )
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


export function logOut() {
    localStorage.removeItem('user')
    return {type: "LOG-OUT"}
}