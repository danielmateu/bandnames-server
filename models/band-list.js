const Band = require("./band");

class BandList {
    constructor() {
        this.bands = [
            new Band('Queen'),
            new Band('Bon Jovi'),
            new Band('Heroes del Silencio'),
            new Band('Metallica'),
        ]
    }
}