const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const io = socket(server);
const cors = require("cors")

const port = process.env.CHAT_PORT || 5000;

app.use(cors())
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log(`${nickName}님이 접속하였습니다.`);

  socket.on("disconnect", () => {
    console.log(`${nickName}님이 나갔습니다.`);
  });

  socket.on("new message", async (data) => {
    const message = new Message({
      name: data.name,
      message: data.message,
    });
    await message.save();
  });

  socket.on("typing", (data) => {
    
  })
});

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
