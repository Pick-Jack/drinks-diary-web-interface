
import { MessageTypes } from '../../_helpers/enums';

export function flashMessage(message, type=MessageTypes.default) {
    return {type: "FLASH_MESSAGE",payload: {type, message}}
}


export function hideMessage() {
    return {type: "HIDE_MESSAGE", payload: {}}
}