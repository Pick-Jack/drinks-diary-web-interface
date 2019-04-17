
import { getUserDiary, createDiaryEntry, updateDiaryEntry, deleteDiaryEntry } from '../../_services/diary.service'


export const setActiveDiary = (authToken, diaryId) => {
    return dispatch => {
        getUserDiary(authToken, diaryId)
            .then(response => {
                if (!response.error) {
                    const diary = response.response
        
                    var currentDate = new Date()
                    var startDate = new Date(diary.info.startDate)
                    var endDate = new Date(diary.info.endDate)

                    var status;
                    var activeDate;
                    if (currentDate < startDate) {
                        status = "Pending"
                        activeDate = new Date(diary.info.startDate)
                    } 
                    else if (currentDate >= startDate && currentDate <= endDate ) {
                        status = "Active"
                        activeDate = new Date()
                    } 
                    else {
                        status = "Complete"
                        activeDate = new Date(diary.info.endDate)
                    }

                    dispatch({
                        type: "SET-DIARY-INFO",
                        payload: {
                            ...diary.info,
                            startDate: startDate,
                            endDate: endDate,
                            status: status
                        }
                    })

                    dispatch({
                        type: "SET-ACTIVE-DATE",
                        payload: activeDate
                    })

                    // Format entries result for diary redux store
                    var entries = {}
                    for (var i = 0; i < diary.entries.length; i++) {
                        entries[diary.entries[i]._id] = diary.entries[i]
                    }

                    dispatch({
                        type: "SET-DIARY-ENTRIES",
                        payload: entries
                    })
                }
            })
    }
}


export const updateActiveDate = (newDate) => {
    return {
        type: "SET-ACTIVE-DATE",
        payload: new Date(newDate)
    }
}


export const updateActiveEntry = (entryId) => {
    if (typeof entryId !== "undefined") {
        return {
            type: "SET-ACTIVE-ENTRY",
            payload: entryId
        }
    } else {
        return {
            type: "UNSET-ACTIVE-ENTRY"
        }
    }
}


export const createEntry = (authToken, diaryId, entryArgs) => {
    return dispatch => {
        createDiaryEntry(authToken, diaryId, entryArgs)
            .then(response => {
                if (response.error) { 
                    throw response.response 
                }
                else {
                    // Dispatch for successful diary operation
                    dispatch({
                        type: "ADD-DIARY-ENTRY",
                        payload: { [response.response._id]: response.response }
                    })
                }
            })
            .catch(error => {
                // Dispatch for failed diary operation
                dispatch({
                    type: "SET-DIARY-ERROR",
                    payload: error.error
                })
            })
    }
}


export const updateEntry = (authToken, diaryId, entryId, args) => {
    return dispatch => {
        updateDiaryEntry(authToken, diaryId, entryId, args)
            .then(response => {
                if (response.error) {
                    throw response.response
                }
                else {
                    // Dispatch for successful diary operation
                    dispatch({
                        type: "UPDATE-DIARY-ENTRY",
                        payload: response.response 
                    })
                }
            })
            .catch(error => {
                // Dispatch for failed diary operation
                dispatch({
                    type: "SET-DIARY-ERROR",
                    payload: error
                })
            })
    }
}


export const deleteEntry = (authToken, diaryId, entryId) => {
    return dispatch => {
        deleteDiaryEntry(authToken, diaryId, entryId)
            .then(response => {
                if (response.error) {
                    throw response.response
                }
                else {
                    // Dispatch for successful diary operation
                    dispatch({
                        type: "DELETE-DIARY-ENTRY",
                        payload: entryId
                    })
                    // Unset the active entry as it is now deleted
                    dispatch({ type: "UNSET-ACTIVE-ENTRY" })
                }
            })
            .catch(error => {
                // Dispatch for failed diary operation
                dispatch({
                    type: "SET-DIARY-ERROR",
                    payload: error
                })
            })
    }
}


export const unsetDiaryError = () => {
    return { type: "UNSET-DIARY-ERROR" }
}


export const resetDiarySuccessStatus = () => {
    return {type: "RESET-DIARY-SUCCESS-STATUS"}
}

export const clearDiaryState = () => {
    return {type: "RESET-ALL"};
}