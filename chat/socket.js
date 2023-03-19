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
  const chat = io.of("chat")

  // 클라이언트 연결
  chat.on("connection", (socket) => {
    console.log(`${nickName}님이 접속하였습니다.`);

    // 클라이언트 연결 해제
    socket.on("disconnect", () => {
      console.log(`${nickName}님이 나갔습니다.`);
    });

    socket.on("join", (data) => {
      socket.join(data)
    })

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
