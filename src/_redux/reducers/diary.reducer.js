
import update from 'react-addons-update'

const defaultState = { info: {}, entries: {} }


export function diary(state=defaultState, action) {
    switch(action.type) {

        case "SET-ACTIVE-DIARY":
            return {...state, info: action.payload }
        
        case "SET-DIARY-ENTRIES":
            return { ...state, entries: action.payload }

        case "SET-ACTIVE-TITLE":
            return { ...state, activeTitle: action.payload }

        case "SET-ACTIVE-DATE":
            const newDate = new Date(action.payload.setHours(0, 0, 0, 0))
            return { ...state, activeDate: newDate }

        case "SET-ACTIVE-ENTRY":
            return { ...state, activeEntry: action.payload }

        case "SET-DIARY-ERROR":
            return { ...state, error: action.payload }
        
        case "ADD-DIARY-ENTRY":
            var entries = update(state.entries, { $merge: action.payload })
            return { ...state, entries: entries, success: true }

        case "UPDATE-DIARY-ENTRY":
            var entries = update(state.entries, { [action.payload._id]: {$set: action.payload} })
            return { ...state, entries: entries, success: true }

        case "DELETE-DIARY-ENTRY":
            var entries = update(state.entries, { [action.payload.entryId]: { $set: undefined } })
            return { ...state, entries: entries }

        case "UNSET-ACTIVE-ENTRY":
            delete state.activeEntry
            return { ...state }

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