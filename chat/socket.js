const socket = require("socket.io");

module.exports = (server) => {
  const io = socket(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    console.log("클라이언트 연결 : ", ip, socket.id);

    socket.on("server", (data) => {
      console.log(data);

      socket.broadcast.emit("client", data);
    });

    socket.on("disconnect", () => {
      console.log("클라이언트 종료 : ", ip, socket.id);
    });

    socket.on("error", (error) => {
      console.error(error);
    });
  });
};
