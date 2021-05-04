
class ValidationException extends Error {
    constructor(message){
        super(message);
    }
}

module.exports = ValidationException;