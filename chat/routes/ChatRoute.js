const express = require("express");
const {
  createChatRoom,
  findChat,
  userChatsRoomList,
} = require("../controllers/ChatController");

const router = express.Router();

router.post("/", createChatRoom);
router.get("/roomList/:senderId", userChatsRoomList);
router.get("/find/:senderId/:receiverId", findChat);

module.exports = router;
