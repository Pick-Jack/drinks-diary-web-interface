import UsersService from '../../_services/users.service';


export function submitLoginRequest(email, password) {
    
    return dispatch => {

        // Set attempted email address regardless of result
        dispatch({ type: "SET-EMAIL", payload: email })

        // Submit request to API to verify credentials
        UsersService.login(email, password)
            .then(
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