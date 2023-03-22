const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const websocket = require("./socket")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const MessageRoute = require("./routes/MessageRoute");
const ChatRoute = require("./routes/ChatRoute");
const { options } = require("./swagger/config.js")

app.use(cors())
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))


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

app.use("/chatRoom", ChatRoute);
app.use("/message", MessageRoute);

websocket(server)