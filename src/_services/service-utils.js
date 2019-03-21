

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
                        case 400:
                            resolve({ error: true, response: responseBody })
                        case 401:
                            break;
                        case 403:
                            break;
                        case 404:
                            break;
                        case 500:
                            break;
                        default:
                            break;
                    }
                })
                .catch(error => { console.log(error)})
            })
            .catch(error => {
                reject(error)
            })
    })
}
