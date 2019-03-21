

export default class ValidationException extends Error {
    constructor(fieldName, message) {
        super(message)
        this.fieldName = fieldName
    }
}