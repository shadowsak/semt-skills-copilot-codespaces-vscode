// Create web server
const express = require('express');
const app = express();

// Create a web server
const http = require('http');
const server = http.createServer(app);

// Create a socket server
const io = require('socket.io')(server);

// Create a comments array
const comments = [];

// Listen to the connection event
io.on('connection', (socket) => {
  console.log('A user is connected');
  // Send comments to the client
  socket.emit('comments', comments);

  // Listen to the comment event
  socket.on('comment', (comment) => {
    // Add the comment to the comments array
    comments.push(comment);
    // Broadcast the comment to all clients
    io.emit('comment', comment);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});