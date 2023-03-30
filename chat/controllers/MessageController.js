const MessageModel = require("../models/messageModel");

exports.addMessage = async (req, res) => {
  const { chatRoomId, senderId, receiverId, message } = req.body;
  const messages = new MessageModel({
    chatRoomId,
    senderId,
    receiverId,
    message,
  });
  try {
    const result = await messages.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatRoomId } = req.params;
  try {
    const result = await MessageModel.find({ chatRoomId }).sort({ createdAt: -1 }).limit(100);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
