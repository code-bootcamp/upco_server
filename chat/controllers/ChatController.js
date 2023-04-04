const ChatModel = require("../models/chatModel.js");

// 채팅방 만들기
exports.createChatRoom = async (req, res) => {
  try {
    const { roomId, senderId, receiverId, createdAt } = req.body;
    const newChat = new ChatModel({
      roomId,
      senderId,
      receiverId,
      createdAt,
    });
    const result = await newChat.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// 채팅방 리스트 전체 조회
exports.ChatsRoomList = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).send(error);
    }

    const chat = await ChatModel.find({ senderId, receiverId });

    console.log(senderId, receiverId);

    if (!chat) {
      return res.status(404).send(error);
    }

    if (chat.length === 0) {
      return res.status(404).send(error);
    }

    return res.status(200).send({ chat });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

// 특정 채팅방 조회
exports.findChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const chat = await ChatModel.findOne({ senderId, receiverId });
    res.status(200).send({ chat });
  } catch (error) {
    res.status(500).send(error);
  }
};
