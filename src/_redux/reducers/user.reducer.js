
var initialState = {isAuthorised: false}
var userDoc = JSON.parse(localStorage.getItem('user'));
if (userDoc) {
    initialState = { ...userDoc, isAuthorised: true }
} 

export function user(state=initialState, action) {
    switch(action.type) {
        
        case "LOGIN-SUCCESS":
            return {...state, ...action.payload, isAuthorised: true}

        case "LOGIN-FAILED":
            return {isAuthorised: false}

        case "LOG-OUT":
            return {isAuthorised: false}

        default:
            return state;

    }
}