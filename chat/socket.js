const socket = require("socket.io");
const { v4: uuidv4 } = require("uuid");

module.exports = (server) => {
  const io = socket(server, { path: "/socket.io" });

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

    socket.on("createRoom", (myId, anotherId) => {
      // console.log(myId, anotherId);
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
      console.log(roomId, myId, anotherId);
      socket.join(roomId);
      socket.emit("roomCreateOrJoin", roomId, "채팅방에 입장하셨습니다.");
    });

    socket.on("message", (message) => {
      const { roomId, contents, myId } = message;
      chatRoom[roomId].message.push({
        userId: myId,
        content: contents,
      });
      console.log(message);
      socket.to(roomId).broadcast.emit("client", message);
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
