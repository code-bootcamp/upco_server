const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    server.listen(process.env.CHAT_PORT);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
