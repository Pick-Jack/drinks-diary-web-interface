
export const messageTypes = Object.freeze({
    default: "default",
    warning: "warning",
    error: "error"
})


export function flashMessage(message, type=messageTypes.default) {
    return {type: "FLASH_MESSAGE",payload: {type, message}}
}


export function hideMessage() {
    return {type: "HIDE_MESSAGE", payload: {}}
}