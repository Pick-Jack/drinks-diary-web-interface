

export default class UnauthorisedError extends Error {
    constructor() {
        super("Authorisation failed.")
    }
}