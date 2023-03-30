const socket = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const ChatModel = require("./models/chatModel.js");
const MessageModel = require("./models/messageModel.js");

module.exports = (server) => {
  const io = socket(server, { path: "chat/socket.io" });

  const chatRoom = {};

  // 소켓 연결
  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // 소켓 연결 해제
    socket.on("disconnect", () => {
      console.log("클라이언트 종료 : ", ip, socket.id);
    });

    // 소켓 에러
    socket.on("error", (error) => {
      console.error(error);
    });

    console.log("클라이언트 연결 : ", ip, socket.id);
    // socket.emit("join message", "채팅방에 입장하셨습니다.");

    socket.on("createRoom", async (myId, anotherId) => {
      let roomId;

      if (Object.keys(chatRoom).length === 0) {
        roomId = uuidv4();
        chatRoom[roomId] = {
          userIds: [myId, anotherId],
          message: [],
        };
      }

      for (const id in chatRoom) {
        if (
          chatRoom[id].userIds.includes(myId) &&
          chatRoom[id].userIds.includes(anotherId)
        ) {
          roomId = id;
          break;
        }

        if (!roomId) {
          roomId = uuidv4();
          chatRoom[roomId] = {
            userIds: [myId, anotherId],
            message: [],
          };
        }
      }
      // console.log(roomId, myId, anotherId);

      const newChatRoom = new ChatModel({
        roomId,
        senderId: myId,
        receiverId: anotherId,
        createdAt: Date.now(),
      });
      // console.log(newChatRoom);
      const result = await newChatRoom.save();
      // console.log(result);
      socket.join(roomId);
      socket.emit(
        "roomCreateOrJoin",
        roomId,
        result,
        "채팅방에 입장하셨습니다.",
      );
    });

    socket.on("joinRoom", async (chatRoomId) => {
      const joinChatRoom = await MessageModel.find({ chatRoomId });
      console.log(joinChatRoom);
      socket.emit("load Message", joinChatRoom);
    });

    socket.on("message", async (message) => {
      const { roomId, contents, myId } = message;
      chatRoom[roomId].message.push({
        userId: myId,
        content: contents,
      });
      // console.log(message);
      const newChat = new MessageModel({
        chatRoomId: roomId,
        senderId: myId,
        contents,
        createdAt: Date.now(),
      });
      const result = await newChat.save();
      // console.log(result);
      socket.broadcast.emit("client", message.contents);
    });

    // 화상채팅 부분
    socket.on("offer", (offer) => {
      // console.log(offer);
      socket.emit("offer", offer.sdp);
    });

    socket.on("answer", (answer) => {
      // console.log(answer);
      socket.emit("answer", answer.sdp);
    });

    socket.on("candidate", (candidate) => {
      // console.log(candidate);
      socket.emit("candidate", candidate);
    });
  });
};
