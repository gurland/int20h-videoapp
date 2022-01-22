const Notification = require('./models/Notification');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('./config.js');
const express = require('express');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser());

const http = require('http');
const server = http.createServer(app);

require('./dbconnection');

const io = require("socket.io")(server, {
  cors: {
    origin: [
        "http://localhost:63342",
        "http://localhost:4200",
        "http://localhost:4201",
        "http://localhost:4021",
        "http://pythagorix.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, JWTSECRET, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));

      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }
})
.on('connection', function(socket) {
  // Connection now authenticated to receive further events
  const chatRoom = "notifications:" + socket.decoded.sub.id;


  socket.on('disconnect', () => {});
  socket.join(chatRoom);

  Notification.find({userId: socket.decoded.sub.id}, (err, notifications) => {
    io.to(chatRoom).emit("notifications", notifications)
  });
});

app.post('/api/notifications', (req, res) => {
  const notification = req.body;

  Notification.create({
    "userId": notification.user_id,
    "notificationType": notification.notification_type,
    "data": notification.data
  }, (err, notif) => {
    io.to("notifications:" + notification.user_id).emit("notifications", [notif]);
    res.send(notif);
  })
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});

