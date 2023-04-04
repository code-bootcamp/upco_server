const MessageModel = require("../models/messageModel");

// 메시지 저장하기
exports.addMessage = async (req, res) => {
  try {
    const { chatRoomId, senderId, contents } = req.body;
    const messages = new MessageModel({
      chatRoomId,
      senderId,
      contents,
      createdAt: Date.now(),
    });
    const result = await messages.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// 메시지 찾아오기
exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const result = await MessageModel.find({ chatRoomId });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
