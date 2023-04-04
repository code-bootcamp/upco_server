const ChatModel = require("../models/chatModel.js");

exports.createChatRoom = async (req, res) => {
  const newChat = new ChatModel({
    roomId: req.body.roomId,
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    createdAt: req.body.createdAt,
  });
  try {
    const result = await newChat.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.userChatsRoomList = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).send({ message: "유저 아이디가 없습니다." });
    }

    const chat = await ChatModel.find({ senderId, receiverId });

    console.log(senderId, receiverId);

    if (!chat) {
      return res.status(404).send({ message: "채팅이 없습니다." });
    }

    if (chat.length === 0) {
      return res.status(404).send({ message: "채팅이 없습니다." });
    }

    console.log(chat);
    return res.status(200).send({ chat });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "에러입니다." });
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      chatMembers: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).send(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};
