const express = require("express");
const {
  createChatRoom,
  findChat,
  userChatsRoomList,
} = require("../controllers/ChatController");

const router = express.Router();

router.post("/", createChatRoom);
router.get("/roomList/:senderId/:receiverId", userChatsRoomList);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
