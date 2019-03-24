
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
                activeDate: action.payload
            }

        case "SET-ACTIVE-ENTRY":
            return {
                ...state,
                activeEntryId: action.payload
            }

        case "UNSET-ACTIVE-ENTRY":
            delete state.activeEntryId
            return { ...state }

        case "UPDATE-DIARY-ENTRIES":
            const entries = update(state.entries, {
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