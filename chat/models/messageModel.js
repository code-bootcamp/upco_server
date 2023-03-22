const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model("Message", MessageSchema);
