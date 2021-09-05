const ChannelsController = require('../../controllers/channels-controller')

class UserEventsHandler {
    constructor(config) {
        this.init(config)
    }

    init({ io, socket }) {
        const user = null,
            channel = null;

        socket.on('join', ({ user, channel }, callback) => {
            this.user = user;
            this.channel = channel;

            socket.join(this.channel);

            ChannelsController.updateChannelParticipants(this.channel, 1, (channel) => {
                socket.broadcast.emit('channel-properties-updated', channel)
            });

            console.log(`[${this.channel}]: ${this.user} join the party`);

            if (callback) callback();
        })

        socket.on('leave', () => {
            socket.leave(this.channel);

            ChannelsController.updateChannelParticipants(this.channel, -1, (channel) => {
                socket.broadcast.emit('channel-properties-updated', channel)
            });

            console.log(`${this.user} has left the channel`)
        })

        socket.on('disconnect', () => {
            if (!this.channel)
                return;

            socket.leave(this.channel);

            ChannelsController.updateChannelParticipants(this.channel, -1, (channel) => {
                socket.broadcast.emit('channel-properties-updated', channel)
            });

            console.log(`${this.user} has been disconnected`)
        })

        socket.on('message', (message) => {
            console.log(`${this.user} sent a message on channel [${this.channel}]:` + JSON.stringify(message))

            ChannelsController.pushMessageToChannel(this.channel, message);
            socket.to(this.channel).emit('message', message);
        })
    }
}

module.exports = UserEventsHandler