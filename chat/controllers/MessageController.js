const MessageModel = require("../models/messageModel");

exports.addMessage = async (req, res) => {
  const { chatRoomId, senderId, text } = req.body;
  const message = new MessageModel({
    chatRoomId,
    senderId,
    message,
  });
  try {
    const result = await message.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatRoomId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
