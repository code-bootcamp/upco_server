const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chatRoomId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  contents: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isSent: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
