
const defaultState = {
    displayType: null, 
    displayMessage: null
}

export function messageFlash(state=defaultState, action) {
    switch(action.type) {
        case "FLASH_MESSAGE":
            return {
                ...state,
                displayType: action.payload.type,
                displayMessage: action.payload.message
            }

        case "HIDE_MESSAGE":
            return defaultState
        
        default:
            return state;
    }
}