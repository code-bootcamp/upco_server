const express = require("express");
const {
  createChatRoom,
  findChat,
  userChats,
} = require("../controllers/ChatController");

const router = express.Router();

router.get("/", createChatRoom);
router.post("/", createChatRoom);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

module.exports = router;