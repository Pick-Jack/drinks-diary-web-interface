
const defaultState = {
    platform: "DESKTOP"
}

export function app(state=defaultState, action) {
    switch(action.type) {
        case "APP_SET_PLATFORM_DESKTOP":
            return {
                ...state,
                platform: action.payload.platform,
                width: action.payload.width
            }

        case "APP_SET_PLATFORM_MOBILE":
            return {
                ...state,
                platform: action.payload.platform,
                width: action.payload.width
            }

        default:
            return state;
    }
}