

class EntityNotFoundException extends Error {
    constructor(message){
        super(message);
        this.name = 'EntityNotFoundException';
    }
}

module.exports = EntityNotFoundException;