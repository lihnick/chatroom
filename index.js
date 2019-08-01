console.log("starting server");

let express = require('express');
let server = express();
let http = require('http').createServer(server);
let io = require('socket.io')(http);

server.use(express.static(__dirname + '/public'));

let users = {};
let messages = [{id: 'SERVER', msg: 'messages', name: 'server'}, {id: 'SERVER', name: 'server', msg:'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.'}];

server.get('/', (req, res) => {
    // res.send('<h1>Hello</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    socket.on('connected', (name) => {
        console.log(`Users ${socket.id} connected ${Object.keys(users).length}`);
        if (!(name in users)) {
            users[socket.id] = name;
        }
        io.emit('update', {id: socket.id, name: name, msg: `User ${name} has connected.`, status: 'connected', past: messages});
    });

    socket.on('disconnect', () => {
        console.log(`Users ${socket.id} disconnected ${Object.keys(users).length}`);
        io.emit('update', {id: socket.id, name: users[socket.id], msg: `User ${(users[socket.id] === undefined) ? socket.id : users[socket.id]} has disconnected`, status: 'disconnected'});
        delete users[socket.id];
        if (Object.keys(users).length == 0) {
            messages = [{id: 'SERVER', msg: 'messages', name: 'server'}, {id: 'SERVER', name: 'server', msg:'In case anyone, for any reason, is wondering what security around Area 51 is like: perimeter is patrolled by armed guards, surveillance cameras & motion detectors, the latter of which are placed on public land to notify guards of your approach from afar.'}];
        }
    });

    socket.on('message', (msg) => {
        io.emit('message', {id: socket.id, name: users[socket.id], msg: msg, status: 'message'}); // sends it back to connected users
        messages.push({id: socket.id, name: users[socket.id], msg: msg, status: 'message'});
        console.log(`message: ${msg}`); // log to console to view
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on localhost: ' + (process.env.PORT || 3000));
});
