
import { OptionTypes } from '../../_helpers/enums'


export function setPlatformDesktop(width) {
    return {
        type: "APP_SET_PLATFORM_DESKTOP",
        payload: { width, platform: "DESKTOP" }
    }
}

export function setPlatformMobile(width) {
    return {
        type: "APP_SET_PLATFORM_MOBILE",
        payload: { width, platform: "MOBILE" }
    }
}

export function setBackOption(location, type=OptionTypes.back) {
    return {
        type: "APP_SET_PAGE_BACK_OPTION",
        payload: { type, location }
    }
}

export function setNavOptions(optionsArray) {
    return {
        type: "APP_SET_PAGE_NAV_OPTIONS",
        payload: optionsArray
    }
}

export function setErrorState(error, code) {
    return {
        type: "APP_SET_ERROR",
        payload: { code, error }
    }
}

export function clearErrorState() {
    return {
        type: "APP_UNSET_ERROR"
    }
}
