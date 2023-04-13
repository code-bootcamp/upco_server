const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const websocket = require("./socket");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
// const MessageRoute = require("./routes/MessageRoute");
// const ChatRoute = require("./routes/ChatRoute");
const { options } = require("./swagger/config.js");
const ChatModel = require("./models/chatModel.js");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// app.use("/chatRoom", ChatRoute);
// app.use("/message", MessageRoute);

app.get("/", (req, res) => {
  res.send("health check");
});

app.get("/chatRoomList/:senderId/", async (req, res) => {
  try {
    const { senderId } = req.params;

    if (!senderId) {
      return res.status(400).send({ message: "유저 아이디가 없습니다." });
    }

    const chat = await ChatModel.find({ senderId });

    console.log(senderId);

    if (!chat) {
      return res.status(404).send({ message: "채팅이 없습니다." });
    }

    if (chat.length === 0) {
      return res.status(404).send({ message: "채팅이 없습니다." });
    }

    console.log(chat);
    return res.status(200).send({ data: chat });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "에러입니다." });
  }
});

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

websocket(server);
