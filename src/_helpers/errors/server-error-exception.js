

export default class ServerErrorException extends Error {
    constructor(message) {
        super(`API error: ${message}`)
    }
}