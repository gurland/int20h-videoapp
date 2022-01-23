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
        "http://videoapp.link",
        "http://157.90.230.141",
        "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, JWTSECRET, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));

      socket.roomId = socket.handshake.query.roomId;
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
  const chatRoom = "chat:" + socket.roomId;

  socket.join(chatRoom);
  const connectedSocketIDs = await io.in(chatRoom).allSockets();
  console.log(Array.from(connectedSocketIDs));
  let connectedUsers = Array.from(connectedSocketIDs)
    .map(otherSocketId => io.sockets.sockets.get(otherSocketId))
    .filter(otherSocket => otherSocket.roomId === socket.roomId)
    .map(otherSocket => otherSocket.userId)

  socket.emit("join", connectedUsers);
  io.to(chatRoom).emit("join", [socket.userId])

  socket.on('disconnect', () => {
      socket.to(chatRoom).emit("leave", [socket.userId]);
      socket.leave(chatRoom);
  });

  Chat.findOneOrCreate({roomId: socket.roomId}, (err, chat) =>
    {
      console.log('==============');
      console.log(err);
      console.log(chat);
      socket.emit('message-broadcast', chat.messages);
    }
  );

  socket.on('message', (msg) => {
    Chat.findOneOrCreate({roomId: socket.roomId}, (err, chat) => {
      msg.senderId = socket.userId;
      msg.senderName = socket.decoded.profileName;
      chat.messages.push(msg);
      chat.save();
      io.to(chatRoom).emit('message-broadcast', [msg]);
    })
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});