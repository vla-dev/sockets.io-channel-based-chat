const ChannelEventsHandler = require('./specific/channels-events');
const UserEventsHandler = require('./specific/user-events')

const socketEvents = (config) => {
    const userEventsHandler = new UserEventsHandler(config);
    const channelEventsHandler = new ChannelEventsHandler(config);

    return {
        userEventsHandler,
        channelEventsHandler
    }
}

module.exports = {
    socketEvents
}