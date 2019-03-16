
import { OptionTypes } from '../../_helpers/enums'


const defaultState = {
    platform: "DESKTOP",
    backOption: {optionType: OptionTypes.logOut, optionLocation: "/logOut"},
    navOptions: []
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

        case "APP_SET_PAGE_BACK_OPTION":
            return {
                ...state,
                backOption: {
                    optionType: action.payload.type,
                    optionLocation: action.payload.location
                }
            }

        case "APP_SET_PAGE_NAV_OPTIONS":
            return {
                ...state,
                navOptions: action.payload
            }

        default:
            return state;
    }
}