/**
 * @swagger
 * /chatRoom:
 *   get:
 *     summary: 게시글 가져오기
 *     tags: [Board]
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
 */

/**
 * @swagger
 * /chatRoom:
 *   post:
 *     summary: 게시글 등록하기
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: 성공
 */
