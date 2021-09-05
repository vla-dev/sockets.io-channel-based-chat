const express         = require('express');
const path            = require('path');
const app             = express().use(express.json());
const router          = require('./router');
const port            = process.env.port || 5000;
const sockets         = require('./services/sockets');
const {socketEvents}  = require('./services/events');

const PRODUCTION      = 'production'
const CLIENT_ROOT     = '/frontend/build'
const ENTRY_POINT     = 'index.html'

router.bindTo(app);
sockets.initSockets(socketEvents);

if(process.env.NODE_ENV === PRODUCTION) {
  app.use(express.static(__dirname + CLIENT_ROOT));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, CLIENT_ROOT, ENTRY_POINT));
  })
}

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});