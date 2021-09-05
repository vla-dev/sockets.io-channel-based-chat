const { v4: uuidv4 } = require('uuid');

const channels = [];

const createChannel = (req, res, next) => {

    try {
        const { name } = req.params;
        const channel = {
            id: uuidv4(),
            name,
            participants: 0,
            messages: []
        }

        channels.push(channel);

        return res.status(200).send(channel);
    } catch (error) {
        return res.status(500).send({
            error: "Something went wrong"
        });
    }
}

const getChannels = (req, res, next) => {
    if (!channels || channels.length === 0)
        return res.status(200).send({ error: "No channels found" });

    return res.status(200).send(channels);
}

const getChannelMessages = (req, res, next) => {
    try {
        const { name } = req.params;
        const channel = channels.find(ch => ch.name === name);

        return res.status(200).send(channel.messages);

    } catch (error) {
        return res.status(500).send({
            error: "Something went wrong"
        });
    }
}

const updateChannelParticipants = (channelName, value, callback) => {
    const channel = channels.find(ch => ch.name === channelName);

    if (channel) {
        if (channel.participants === 0 && value < 0)
            return;

        channel.participants += value;
    }
    if (callback) callback(channel)
}

const pushMessageToChannel = (channelName, message) => {
    const channel = channels.find(ch => ch.name === channelName);
    channel.messages.push(message);
}

module.exports = {
    createChannel,
    getChannels,
    getChannelMessages,
    updateChannelParticipants,
    pushMessageToChannel
}