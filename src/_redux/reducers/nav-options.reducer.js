
const defaultState = {
    options: []
}

export function navOptions(state=defaultState, action) {
    switch(action.type) {
        case "NAV_OPTIONS_SET":
            return {
                ...state,
                options: action.payload
            }

        default:
            return state;
    }
}