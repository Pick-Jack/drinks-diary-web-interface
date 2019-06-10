
var initialState = {isAuthorised: false}
var authToken = localStorage.getItem('authToken');
if (authToken) {
    initialState = { authToken, isAuthorised: true }
} 

export function user(state=initialState, action) {
    switch(action.type) {
        case "LOGIN-SUCCESS":
            return {...state, authToken: action.payload, isAuthorised: true}

        case "SET-USER-ID":
            return {...state, userId: action.payload}

        case "SET-DISPLAY-NAME":
            return {...state, displayName: action.payload} 

        case "LOG-OUT":
        case "LOGIN-FAILED":
        case "AUTHENTICATION-FAILED": 
            return {isAuthorised: false}

        default:
            return state;

    }
}