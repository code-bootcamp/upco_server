/**
 * @swagger
 * /chatRoomList:senderId:
 *   get:
 *     summary: 채팅방 목록 가져오기
 *     tags: [ChatRoomList]
 *     parameters:
 *       - in: 설명 입력
 *         name: number
 *         type: int
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   roomId:
 *                     type: string
 *                     example: 채팅방 아이디
 *                   senderId:
 *                     type: string
 *                     example: 보낸사람 아이디
 *                   receiverId:
 *                     type: string
 *                     example: 받는사람 아이디
 *                   createdAt:
 *                     type: Date
 *                     example: 채팅방 생성 날짜
 */

/**
 * @swagger
 * /chatRoomList:senderId:
 *   post:
 *     summary: 채팅방 목록 가져오기
 *     tags: [ChatRoomList]
 *     responses:
 *       200:
 *         description: 성공
 */
