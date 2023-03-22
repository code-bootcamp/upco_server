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
 *                  type: array
 *                  items:
 *                      properties:
 *                          number:
 *                              type: int
 *                              example: 3
 *
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: 메세지 보내기
 *     tags: [Message]
 *     responses:
 *          200:
 *              description: 성공
 */
