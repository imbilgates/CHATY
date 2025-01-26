require('dotenv').config();
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom, getAllRooms } = require('./users');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Endpoint to check if the username is taken
app.post('/check-username', (req, res) => {
    const { name, room } = req.body;
    const user = getUsersInRoom(room.trim().toLowerCase()).find(user => user.name === name.trim().toLowerCase());
    if (user) {
        return res.json({ available: false });
    }
    return res.json({ available: true });
});

// Endpoint to get all rooms
app.post('/add-rooms', (req, res) => {
    const rooms = getAllRooms();
    return res.json({ rooms });
  });

io.on('connection', (socket) => {
    socket.on('join', ({ name, room, image }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room, image });

        if (error) return callback && callback(error);

        // socket.emit('message', { user: 'bot', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, image: `${image}` });

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        if (callback) callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: user.name, text: message, image: user.image });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });  // Ensure roomData is sent after message
        }

        if (callback) callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!`, image: `${user.image}` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});



// Serve the client app
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
