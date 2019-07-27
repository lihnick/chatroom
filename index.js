console.log("starting server");

let express = require('express');
let server = express();
let http = require('http').createServer(server);
let io = require('socket.io')(http);

server.use(express.static(__dirname + '/public'));

server.get('/', (req, res) => {
    // res.send('<h1>Hello</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user conneced');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('message', (msg) => {
        io.emit('message', msg); // sends it back to connected users
        console.log('message: ' + msg); // log to console to view
    });
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
