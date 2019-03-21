import { submitApiRequest, Methods } from './service-utils';
import { ValidationException, UnauthorisedException } from "../_helpers/errors";



const diary_api_endpoint = `${process.env.REACT_APP_API_URL}/diary`




// Definition of Error type for throwing Errors from the response
export class DiaryResponseException extends Error {
    constructor(endpoint, code, message) {
        super(message)
        this.code = code
        this.endpoint = endpoint
    }
}


/**
 * Submits a request to the diary endpoint of the Drinks Diary API
 * @param {string} endpoint sub-endpoint to target request
 * @param {string} method method used to send request
 * @param {string} authToken user authorisation token
 * @param {JSON} body contains the parameters for the request body
 */
const submitRequest = (endpoint, method, authToken, body) => {
    const url = `${process.env.REACT_APP_API_URL}/diary${endpoint}`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }

    // Stringify body for request
    if (body)
        body = JSON.stringify(body)

    // Submit request to API
    return fetch(url, {mode: "cors", method, headers, body})
}


/**
 * Makes call to the Drinks Diary API to create a new diary
 * @param {JSON} userDoc contains user details for verification.
 * @param {JSON} args contains the body argument values for the request body
 * @returns a promise which resolves to the response JSON object
 * @throws DiaryResponseException containing details of non-successful requests
 */
export const createDiary = (userDoc, args) => {
    var body;
    if (args.hasOwnProperty('template')) {
        body = {
            diaryId: args.diaryId
        }
    } else {
        body = {
            diaryName: args.diaryName,
            duration: args.duration
        }
    }

    // Submit creation request to API
    return new Promise((resolve, reject) => {
        const endpoint = '/createDiary'
        submitRequest(endpoint, Methods.post, userDoc.authToken, body)
            .then(response => {
                response.json().then(responseBody => {
                    if (response.status === 200 || response.status === 201) {
                        resolve(responseBody)
                    }
                    else if (responseBody.hasOwnProperty("error")) {
                        if (response.status === 400 && responseBody.error.type == "ValidationError") {
                            // Flag first error in returned list
                            throw new ValidationException(responseBody.error.errors[0].field, responseBody.error.errors[0].message)
                        }
                        else  {
                            throw new DiaryResponseException(endpoint, response.status, responseBody.error.message)
                        }
                    }
                })
                .catch(error => {
                    reject(error)
                })
            })
            .catch(error => {
                reject(error)
            })
        })
}

/**
 * Send request to Drinks Diary API to retrieve the diaries associated
 * with the account associated with the provided authentication token.
 * @param {String} authToken is an account bound server authentication token
 * @return {Promise} resolves to a JSON containing the response or any errors to catch
 */
export const getUserDiaries = async (authToken) => {
    const url = `${diary_api_endpoint}/getDiaries`
    return await submitApiRequest(url, Methods.get, null, authToken)
}


/**
 * Send request to Drinks Diary API for diary info and entries associated
 * with the provided diary ID.
 * @param {String} authToken is an account bound server authentication token
 * @param {String} diaryId is the ID of the targeted diary
 * @return {Promise} resolves to a JSON containing the response or any errors to catch
 */
export const getUserDiary = async (authToken, diaryId) => {
    const url = `${diary_api_endpoint}/${diaryId}`
    return await submitApiRequest(url, Methods.get, null, authToken)
}


/**
 * Send request to Drinks Diary API to create a new diary entry
 * in the diary with the provided ID.
 * @param {String} authToken is an account bound server authentication token
 * @param {String} diaryId is the ID of the targeted diary
 * @param {JSON} args contains the arguments required to create a new entry
 * @return {Promise} resolves to a JSON containing the response or any errors to catch
 */
export const createDiaryEntry = async (authToken, diaryId, args) => {
    const url = `${diary_api_endpoint}/${diaryId}/create`
    const body = {
        drinkType: args.drinkType, 
        volume: args.volume,
        measurement: args.measure,
        caffeinated: args.caffeinated,
        alcoholic: args.alcoholic
    }
    return await submitApiRequest(url, Methods.post, body, authToken)
}


/**
 * Send request to Drinks Diary API to udpate an existing diary entry
 * in the diary with the provided ID.
 * @param {String} authToken is an account bound server authentication token
 * @param {String} diaryId is the ID of the targeted diary
 * @param {String} entryId is the ID of the targeted diary entry
 * @param {JSON} args contains the arguments required to create a new entry
 * @return {Promise} resolves to a JSON containing the response or any errors to catch
 */
export const updateDiaryEntry = async (authToken, diaryId, entryId, args) => {
    const url = `${diary_api_endpoint}/${diaryId}/updateEntry`
    const body = {
        entryId: entryId,
        drinkType: args.drinkType, 
        volume: args.volume,
        measurement: args.measure,
        caffeinated: args.caffeinated,
        alcoholic: args.alcoholic
    }
    return await submitApiRequest(url, Methods.post, body, authToken)
}