/**
 * @swagger
 * /message:
 *   get:
 *     summary: 메세지 보내기
 *     tags: [Message]
 *     parameters:
 *          - in: query
 *            name: number
 *            type: int
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                  items:
 *                    properties:
 *                      chatRoomId:
 *                        type: string
 *                        example: 채팅방 아이디
 *                      senderId:
 *                         type: string
 *                         example: 채팅 보낸 사람 아이디
 *                      receiverId:
 *                         type: string
 *                         example: 채팅 받는 사람 아이디
 *                      message: 
 *                         type: string
 *                         example: 채팅 메세지
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: 메세지 보내기
 *     tags: [Message]
 *     responses:
 *          200:
 *            description: 성공
 */
