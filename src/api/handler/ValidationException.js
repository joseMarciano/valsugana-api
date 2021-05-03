
class ValidationException extends Error {
    constructor(message){
        this.message = message;
    }
}

module.exports = ValidationException;