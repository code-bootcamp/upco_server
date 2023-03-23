const MessageModel = require("../models/messageModel");

exports.addMessage = async (req, res) => {
  const { chatRoomId, senderId, message } = req.body;
  const messages = new MessageModel({
    chatRoomId,
    senderId,
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
    const result = await MessageModel.find({ chatRoomId });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
