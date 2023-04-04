/**
 * @swagger
 * /message:
 *   get:
 *     summary: 메시지 가져오기
 *     tags: [Message]
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
 *                   chatRoomId:
 *                     type: string
 *                     example: 메시지 아이디
 *                   senderId:
 *                     type: string
 *                     example: 보낸사람 아이디
 *                   contents:
 *                     type: string
 *                     example: 메시지 내용
 *                   createdAt:
 *                     type: Date
 *                     example: 메시지 생성 날짜
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: 메시지 가져오기
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: 성공
 */
