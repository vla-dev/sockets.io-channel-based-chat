const ChannelsController = require('../../controllers/channels-controller')

class ChannelEventsHandler {
    constructor(config) {
        this.init(config)
    }

    init({ io, socket }) { 
        socket.on('create-channel', (channel, callback) => {
            socket.broadcast.emit('channel-created', channel)
            if (callback) callback();
        }) 
    }
}

module.exports = ChannelEventsHandler