const socket = require('socket.io');

module.exports = (server, app, sessionMiddleware) => {
  const io = socket(server, { path: "/socket.io" });
  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    socket.on('join', (data) => {
      socket.join(data);
      socket.to(data).emit('join', {
        user: 'system',
        chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });
    });

    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 접속 해제');
      const { referer } = socket.request.headers;
      const roomId = new URL(referer).pathname.split('/').at(-1);
      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) { // 유저가 0명이면 퇴장 알림
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
        })
      };      
    });
  });
};
