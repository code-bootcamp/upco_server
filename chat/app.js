const socket = io()

socket.emit("connection", (data) => {
  console.log("연결되었습니다.")
})

socket.on("disconnection", () => {
  
})

