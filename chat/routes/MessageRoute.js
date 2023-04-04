const express = require("express");
const {
  addMessage,
  getMessages,
} = require("../controllers/MessageController.js");

const router = express.Router();

router.post("/", addMessage);
router.get("/:chatRoomId", getMessages);

module.exports = router;
