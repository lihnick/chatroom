console.log("starting server");

let express = require('express');
let server = express();
let http = require('http').createServer(server);
let io = require('socket.io')(http);

server.use(express.static(__dirname + '/public'));

let users = {}

server.get('/', (req, res) => {
    // res.send('<h1>Hello</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user conneced');

    socket.on('setName', (name) => {
        if (!(name in users)) {
            users[socket.id] = name;
        }
        io.emit('update', {id: socket.id, name: name, status: "name"})
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        delete users[socket.id];
    });

    socket.on('message', (msg) => {
        io.emit('message', {id: socket.id, name: users[socket.id], msg: msg}); // sends it back to connected users
        console.log('message: ' + msg); // log to console to view
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on localhost: ' + process.env.PORT || 3000);
});
