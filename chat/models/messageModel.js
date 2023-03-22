const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatRoomId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model("Message", MessageSchema);
