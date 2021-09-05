# sockets.io-channel-based-chat

## Setup
#### Package.json
    - "local": "nodemon app.js",
    - "build-client": "cd ./frontend && npm install && npm run build",
    - "dev": "NODE_ENV=development npm run local",
    - "prod": "npm run build-client && npm install && NODE_ENV=production node app.js"

## Servers
    - Socket.io is listening at: `http://localhost:8888`
    - Rest API is listening at: `http://localhost:5000`
    
## How it works
The chat is rooms based. The first UI page has a `Start` which once pressed redirects you to the nickname page. Here you have to enter the desired nickname, then click on `CONFIRM` button.

The next page displays both the rooms available on the server and the functionality to add a new room. Each room is represented in the UI by: Channel name, Participants, Messages and `JOIN` action.

You can simply join an existing channel by clicking the `JOIN` button next to it 

# Disclaimer
This implementation was only to increase my knowledge and it's not too scalable.
