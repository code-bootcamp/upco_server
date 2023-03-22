const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const cors = require("cors")
const MessageRoute = require("./routes/MessageRoute");
const ChatRoute = require("./routes/ChatRoute");

app.use(cors())
app.use(express.json())
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

app.get("/", (req, res) => {
  res.send("health check");
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

