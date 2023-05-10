const BandList = require("./band-list");


class Sockets {

    constructor(io) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            // Votar por la banda
            socket.on('vote-band', (id) => {
                this.bandList.increaseVotes(id);
                // Emitir a todos los clientes conectados el cambio en la banda
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Borrar banda
            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                // Emitir a todos los clientes conectados el cambio en la banda
                this.io.emit('current-bands', this.bandList.getBands());
            })

            // Cambiar nombre de la banda
            socket.on('change-name-band', ({ id, name }) => {
                this.bandList.changeName(id, name);
                // Emitir a todos los clientes conectados el cambio en la banda
                this.io.emit('current-bands', this.bandList.getBands());
            })

            // Crear nueva banda
            socket.on('add-band', ({ name }) => {
                this.bandList.addBand(name);
                // Emitir a todos los clientes conectados el cambio en la banda
                this.io.emit('current-bands', this.bandList.getBands());
            })

            // Ordenar bandas por orden de votos
            socket.on('sort-bands', ({ bands }) => {
                this.bandList.sortBands(bands);
                // Emitir a todos los clientes conectados el cambio en la banda
                this.io.emit('current-bands', this.bandList.getBands());
            });


        });
    }


}


module.exports = Sockets;