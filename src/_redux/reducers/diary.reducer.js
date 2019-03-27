
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
                entries: entries
            }

        case "UPDATE-DIARY-ENTRIES":
            var entries = update(state.entries, {
                [action.payload.entry._id]: {$set: action.payload.entry}
            })
            return {
                ...state,
                entries: entries
            }

        default:
            return state;
    }
}