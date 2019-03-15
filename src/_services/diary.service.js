import { isNull } from "util";

/**
 * Makes call to the Drinks Diary API to create a new diary
 * @param {JSON} userDoc contains user details for verification.
 * @param {null | string} template represents the predefined diary configuration to use for creation
 * @param {undefined | string} diaryName is the name of the new diary
 * @param {undefined | Date} startDate is the date the diary commences.
 * @param {undefined | Date} endDate  is the date the diary finishes.
 * @returns
 */
export const createDiary = (userDoc, template, diaryName, startDate, endDate) => {
    const options = {
        method: "post",
        headers: {'Content-Type': 'application/json', 'Authorization': userDoc.token}
    }

    if (typeof template !== "undefined" && !isNull(template)) {
        // TODO: implement diary template subscription
    } 
    else {    
        // Check for missing arguments
        if (typeof diaryName === "undefined" || typeof startDate === "undefined" || typeof endDate === "undefined") {
            throw new Error("Missing arguments, expected: diaryName, startDate, endDate.")
        }
        
        // Submit action to API and handle response
        options.body = JSON.stringify({diaryName, startDate, endDate})        
        var fetchPromise = fetch(`${process.env.REACT_APP_API_URL}/diary/createDiary`, options)
        return fetchPromise.then(
            response => {
                try {
                    return response.json()
                } 
                catch(error) {
                    throw error
                }
            },
            error => {
                throw error
            }
        )
    }
}