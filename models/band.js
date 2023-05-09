const {v4: uuidv4} = require('uuid')

class Band {
    constructor(name){

        this.id = uuidv4(); // Identificador único
        this.name = name;
        this.albums = [];
        this.votes = 0
    }
}

module.exports = Band;