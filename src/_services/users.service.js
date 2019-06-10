import { submitApiRequest, Methods } from './service-utils';
const users_api_endpoint = `${process.env.REACT_APP_API_URL}/users`


/** 
 * Submit user verification request to the API with the given details 
 * submitted by the client.
 * @param (string) username is the username submitted by the client
 * @param (string) password is the password submitted by the client
 * @returns (JSON) the server response
 */
export const login = async (email, password) => {
    const url = `${users_api_endpoint}/verifyCredentials`
    return submitApiRequest(url, Methods.post, { email, password })
}


/**
 * Submit a user registration request to the Drinks Diary API
 * @param {JSON} args registration arguments
 * @return {Promise} returns a promise which resolves the the response json
 */
export const register = (args) => {
    // Configure request options
    const body = {
        email: args.email,
        password: args.password,
        forename: args.forename,
        surname: args.surname,
        gender: args.gender,
        dob: args.dob
    }

    const url = `${users_api_endpoint}/createUser`
    return submitApiRequest(url, Methods.post, body)
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


export const getAccountDetails = async (authToken, accountId) => {
    if (typeof accountId === "undefined") {
        // Retrieve account details associated with the authToken
        const url = `${users_api_endpoint}/getUser`
        return submitApiRequest(url, Methods.get, null, authToken)
    } else {
        // Retrieve account details associated with the provided accountId
        // TODO : implemenet fetch
    }
}
