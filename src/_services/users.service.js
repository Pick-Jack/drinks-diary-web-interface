
const UsersService = {
    login,
}

/** 
 * Submit user verification request to the API with the given details 
 * submitted by the client.
 * @param (string) username is the username submitted by the client
 * @param (string) password is the password submitted by the client
 * @returns (JSON) the server response
 */
function login(email, password) {
    // Configure request options
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    // Submit verification request to API
    var fetchPromise = fetch(`${process.env.API_URL}/users/verifyCredentials`, requestOptions)
    return fetchPromise.then(
        response => {
            return response.json()
        },
        error => {
            throw error
        }
    )
}


export default UsersService