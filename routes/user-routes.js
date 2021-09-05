const express               = require("express");
const router                = express.Router();
const ChannelsController    = require('../controllers/channels-controller')

router.post('/create-channel/:name', ChannelsController.createChannel);

router.get('/get-channels', ChannelsController.getChannels);

router.get('/get-channel-messages/:name', ChannelsController.getChannelMessages);

module.exports = router;  