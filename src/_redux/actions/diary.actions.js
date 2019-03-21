
import { getUserDiary, updateDiaryEntry } from '../../_services/diary.service'


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
    return {
        type: "SET-ACTIVE-ENTRY",
        payload: entryId
    }
}


export const createDiaryEntry = () => {

}


export const updateEntry = (authToken, diaryId, entryId, args) => {
    return async dispatch => {
        // Use await to propagate 
        const response = await updateDiaryEntry(authToken, diaryId, entryId, args)
        if (response.error) {
            throw response.response
        }

        // Dispatch to reducer
        dispatch({
            type: "UPDATE-DIARY-ENTRIES",
            payload:  {...response}
        })
    }
}


