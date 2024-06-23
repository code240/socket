const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
      origin: '*',
    }
  });
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', (code) => {
    socket.join(code);
    console.log(`user joined room: ${code}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chatMessage', ({ code, message }) => {
    console.log(`chatMessage received for room ${code}:`, message);
    io.to(code).emit('chatMessage', `x: ${message}`); 
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
