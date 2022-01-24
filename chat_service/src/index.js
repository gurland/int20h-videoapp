const http = require("http");
const Chat = require("./models/Chat");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./config.js");

require("./dbconnection");

peers = {};

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
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      JWTSECRET,
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));

        socket.roomId = socket.handshake.query.roomId;
        socket.decoded = decoded;
        socket.userId = socket.decoded.sub.id;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", async function (socket) {
  // Connection now authenticated to receive further events
  const chatRoom = "chat:" + socket.roomId;
  io.to(chatRoom).emit("join", [[socket.userId, socket.id]]);

  socket.join(chatRoom);

  const connectedSocketIDs = await io.in(chatRoom).allSockets();
  console.log(Array.from(connectedSocketIDs));
  let connectedUsers = Array.from(connectedSocketIDs)
    .map((otherSocketId) => io.sockets.sockets.get(otherSocketId))
    .filter((otherSocket) => otherSocket.roomId === socket.roomId)
    .map((otherSocket) => [otherSocket.userId, otherSocket.id]);

  socket.emit("join", connectedUsers);



  // Initiate the connection process as soon as the client connects

  peers[socket.id] = socket;

  // Asking all other clients to setup the peer connection receiver
  // socket.to(chatRoom).emit("initReceive", socket.id);
  for (let id in peers) {
    if (id === socket.id) continue;
    console.log("sending init receive to " + socket.id);
    peers[id].emit("initReceive", socket.id);
  }

  /**
   * relay a peerconnection signal to a specific socket
   */
  socket.on("signal", (data) => {
    console.log("sending signal from " + socket.id + " to ", data);
    if (!peers[data.socket_id]) return;
    peers[data.socket_id].emit("signal", {
      socket_id: socket.id,
      signal: data.signal,
    });
  });

  /**
   * Send message to client to initiate a connection
   * The sender has already setup a peer connection receiver
   */
  socket.on("initSend", (init_socket_id) => {
    console.log("INIT SEND by " + socket.id + " for " + init_socket_id);
    peers[init_socket_id].emit("initSend", socket.id);
  });

  /**
   * remove the disconnected peer connection from all other connected clients
   */
  socket.on("disconnect", () => {
    console.log("socket disconnected " + socket.id);
    socket.to(chatRoom).emit("removePeer", socket.id);
    delete peers[socket.id];

    socket.to(chatRoom).emit("leave", [socket.userId]);
    socket.leave(chatRoom);
  });

  Chat.findOneOrCreate({ roomId: socket.roomId }, (err, chat) => {
    console.log("==============");
    console.log(err);
    console.log(chat);
    socket.emit("message-broadcast", chat.messages);
  });

  socket.on("message", (msg) => {
    Chat.findOneOrCreate({ roomId: socket.roomId }, async (err, chat) => {
      msg.senderId = socket.userId;
      console.log(socket.decoded);
      msg.senderName = msg.senderName || socket.decoded.sub.profile_name;
      chat.messages.push(msg);
      await chat.save();
      io.to(chatRoom).emit("message-broadcast", chat.messages);
    });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
