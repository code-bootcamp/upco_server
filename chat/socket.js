const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const io = socket(server);
const cors = require("cors");
const path = require("path");

const port = process.env.CHAT_PORT || 4000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

module.exports = (server, app) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const chat = io.of("chat");

  // 클라이언트 연결
  chat.on("connection", (socket) => {
    console.log("연결!");

    socket.on("join", (data) => {
      socket.join(data);
      socket.to(data).emit("join", {
        user: "system",
        chat: `${nickName}님이 입장하였습니다.`
      })
    });

    socket.on("disconnect", () => {
      console.log("연결 해제!");
      const referer = socket.request.headers
      const userCount = 0
      if (userCount === 0) {
        console.log("채팅방 제거")
      } else {
        console.log(`${nickName}님이 퇴장하였습니다.`);
      }
    });

    // 에러 발생 시
    socket.on("error", (error) => {
      console.error(error, "에러가 발생했습니다.");
    });

    socket.on("test", (data) => {
      console.log(data);
    });

    socket.interval = setInterval(() => {
      socket.emit("news", "Hi!!");
    }, 3000);
  });
};

// 몽고DB 연결
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    server.listen(4000);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
