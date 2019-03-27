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
 * Makes call to the Drinks Diary API to create a new diary
 * @param {JSON} userDoc contains user details for verification.
 * @param {JSON} args contains the body argument values for the request body
 * @returns a promise which resolves to the response JSON object
 * @throws DiaryResponseException containing details of non-successful requests
 */
export const createDiary = async (authToken, args) => {
    const url = `${diary_api_endpoint}/createDiary`
    return await submitApiRequest(url, Methods.post, args, authToken)
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
    const url = `${diary_api_endpoint}/${diaryId}/createEntry`
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