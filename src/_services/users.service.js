import { resolve } from "path";


/** 
 * Submit user verification request to the API with the given details 
 * submitted by the client.
 * @param (string) username is the username submitted by the client
 * @param (string) password is the password submitted by the client
 * @returns (JSON) the server response
 */
export function login(email, password) {
    // Configure request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    // Submit verification request to API
    return fetch(`${process.env.REACT_APP_API_URL}/users/verifyCredentials`, requestOptions)
}


/**
 * Submit a user registration request to the Drinks Diary API
 * @param {JSON} args registration arguments
 * @return {Promise} returns a promise which resolves the the response json
 */
export function register(args) {
    // Configure request options
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: args.email,
            password: args.password,
            forename: args.forename,
            surname: args.surname,
            gender: args.gender,
            dob: args.dob
        })
    }
    
    // Submit user creation request to API
    var fetchPromise = fetch(`${process.env.REACT_APP_API_URL}/users/createUser`, options)
    return fetchPromise.then(
        response => {
            return response.json()
        },
        error => {
            throw error
        }
    )
}


/**
 * Checks the authenticty of the clients API authentication token
 * @param {String} token is the authentication token to check
 * @returns {Promise} resolves to the API response
 */
export function checkAuthorisation(token) {
    const method = "GET"
    const headers = { 'Authorization': `Bearer ${token}`}
    const url = `${process.env.REACT_APP_API_URL}/users/verifyToken`

    // Submit request to API
    return fetch(url, {method, headers})
}