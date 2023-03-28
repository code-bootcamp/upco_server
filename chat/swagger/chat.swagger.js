/**
 * @swagger
 * /chatRoom:
 *   get:
 *     summary: 채팅방 만들기
 *     tags: [ChatRoom]
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
 *                  type: array
 *                  items:
 *                    properties:
 *                      chatMember:
 *                          type: array
 *                          example: [], []
 */

/**
 * @swagger
 * /chatRoom:
 *   post:
 *     summary: 채팅방 만들기
 *     tags: [ChatRoom]
 *     responses:
 *          200:
 *              description: 성공
 */
