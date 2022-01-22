const http = require('http');
const Chat = require('./models/Chat');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('./config.js');

require('./dbconnection');

const server = http.createServer();
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

      socket.sessionId = socket.handshake.query.sessionId;
      socket.decoded = decoded;
      socket.userId = socket.decoded.sub.id;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }
})
.on('connection', async function(socket) {
  // Connection now authenticated to receive further events
  const chatRoom = "chat:" + socket.sessionId;

  socket.join(chatRoom);
  const connectedSocketIDs = await io.in(chatRoom).allSockets();
  console.log(Array.from(connectedSocketIDs));
  let connectedUsers = Array.from(connectedSocketIDs)
    .map(otherSocketId => io.sockets.sockets.get(otherSocketId))
    .filter(otherSocket => otherSocket.sessionId === socket.sessionId)
    .map(otherSocket => otherSocket.userId)

  socket.emit("join", connectedUsers);
  io.to(chatRoom).emit("join", [socket.userId])

  socket.on('disconnect', () => {
      socket.to(chatRoom).emit("leave", [socket.userId]);
      socket.leave(chatRoom);
  });

  Chat.findOneOrCreate({sessionId: socket.sessionId}, (err, chat) =>
    {
      socket.emit('message-broadcast', chat.messages);
    }
  );

  socket.on('message', (msg) => {
    Chat.findOneOrCreate({sessionId: socket.sessionId}, (err, chat) => {
      msg.senderId = socket.userId;
      chat.messages.push(msg);
      chat.save();
      io.to(chatRoom).emit('message-broadcast', [msg]);
    })
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});