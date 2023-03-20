const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const io = socket(server);
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
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