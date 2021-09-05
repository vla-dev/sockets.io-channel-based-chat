const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
      }
});
const port = process.env.sockets_port || 8888;


const initSockets = (addEventsWithConfig) => {
    io.on("connection", (socket) => {
        addEventsWithConfig({
            io,
            socket
        })
    });

    httpServer.listen(port, () => {
        console.log(`Socket.io is listening at http://localhost:${port}`)
    });

    return io;
}

module.exports = {
    initSockets
} 