
import update from 'react-addons-update'

const defaultState = { info: {}, entries: {} }


export function diary(state=defaultState, action) {
    switch(action.type) {

        case "SET-DIARY-INFO":
            return {
                ...state,
                info: action.payload
            }

        case "SET-DIARY-ENTRIES":
            return {
                ...state,
                entries: action.payload
            }

        case "SET-ACTIVE-DATE":
            return {
                ...state,
                activeDate: new Date(action.payload.setHours(0, 0, 0, 0))
            }

        case "SET-ACTIVE-ENTRY":
            return {
                ...state,
                activeEntryId: action.payload
            }

        case "UNSET-ACTIVE-ENTRY":
            delete state.activeEntryId
            return { ...state }

        case "ADD-DIARY-ENTRY":
            var entries = update(state.entries, {
                $merge: action.payload
            })
            return { 
                ...state, 
                entries: entries,
                success: true
            }

        case "UPDATE-DIARY-ENTRY":
            var entries = update(state.entries, {
                [action.payload._id]: {$set: action.payload}
            })
            return {
                ...state,
                entries: entries,
                success: true
            }

        case "DELETE-DIARY-ENTRY":
            var entries = update(state.entries, { 
                [action.payload.entryId]: { $set: undefined }
            })
            return {
                ...state,
                entries: entries
            }

        case "SET-DIARY-ERROR":
            return {
                ...state,
                error: action.payload
            }

        case "UNSET-DIARY-ERROR":
            const {error, ...noErrorState} = state
            return noErrorState

        case "RESET-DIARY-SUCCESS-STATUS":
            const {success, ...noSuccessState} = state
            return noSuccessState

        case "RESET-ALL":
            return {...defaultState};

        default:
            return state;
    }
}