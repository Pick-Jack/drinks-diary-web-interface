
// Redux imports
import { store } from '../_redux/store'
import { setErrorState } from '../_redux/actions/app.actions'
import { logOut } from '../_redux/actions/user.actions'


// Defininition of Enum for handled request methods by API
export const Methods = Object.freeze({
    get: "GET",
    post: "POST"
})


export const submitApiRequest = (url, method, body, authToken) => {
    const headers = {}
    
    // Prepare request for body if provided
    if (body) { 
        headers['Content-Type'] = 'application/json'
        if (typeof body !== "string") {
            body = JSON.stringify(body)
        }
    }

    // Prepare request authentication headers if token provided
    if (authToken) { headers['Authorization'] = `Bearer ${authToken}` }

    return new Promise((resolve, reject) => {
        fetch(url, {method, headers, body})
            .then(response => { response.json()
                .then(responseBody => {
                    switch(response.status) {
                        case 200:
                        case 201:
                            resolve({ error: false, response: responseBody })
                            break
                        case 400:
                            resolve({ error: true, response: responseBody })
                            break
                        case 401:
                            store.dispatch(logOut(responseBody, 401))
                            store.dispatch(setErrorState(responseBody, 401))
                            break;
                        case 403:
                            store.dispatch(setErrorState(responseBody, 403))
                            break;
                        case 404:
                            store.dispatch(setErrorState(responseBody, 404))
                            break;
                        default:
                            store.dispatch(setErrorState(responseBody, 500))
                            break;
                    }
                })
                .catch(error => { throw error })
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}
