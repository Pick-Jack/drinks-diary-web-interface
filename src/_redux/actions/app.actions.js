
export function setPlatformDesktop(width) {
    return {
        type: "APP_SET_PLATFORM_DESKTOP",
        payload: {
            width,
            platform: "DESKTOP",
        }
    }
}

export function setPlatformMobile(width) {
    return {
        type: "APP_SET_PLATFORM_MOBILE",
        payload: {
            width,
            platform: "MOBILE",
        }
    }
}