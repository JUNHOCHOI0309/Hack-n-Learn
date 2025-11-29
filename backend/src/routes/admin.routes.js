import { Router } from "express";
import * as postTypeController from "../controllers/postType.controller.js";
import * as AdminController from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/post-types", requireAdmin, postTypeController.createPostType);
router.delete("/post-types/:id", requireAdmin, postTypeController.deletePostType);
router.get("/post-types", requireAdmin, postTypeController.getPostTypes);

router.delete("/posts/:id", requireAdmin, AdminController.deletePost);

router.delete("/comments/:id", requireAdmin, AdminController.deleteComment);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 관리자 전용 API
 */

/**
 * @swagger
 * /api/admin/post-types:
 *   get:
 *     summary: 카테고리(PostType) 목록 조회
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: 카테고리 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/PostType' }
 *
 *   post:
 *     summary: 카테고리 생성
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "자유" }
 *               active: { type: boolean, example: true }
 *     responses:
 *       201:
 *         description: 생성된 카테고리 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/PostType' }
 *
 * /api/admin/post-types/{id}:
 *   delete:
 *     summary: 카테고리 삭제
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 삭제 성공 메시지
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "카테고리가 삭제되었습니다." }
 */

/**
 * @swagger
 * /api/admin/posts/{id}:
 *   delete:
 *     summary: 게시글 강제 삭제
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "게시글이 삭제되었습니다." }
 */

/**
 * @swagger
 * /api/admin/comments/{id}:
 *   delete:
 *     summary: 댓글/답글 강제 삭제
 *     tags: [Admin]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "댓글이 삭제되었습니다." }
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostType:
 *       type: object
 *       properties:
 *         _id: { type: string, example: "65001aaa111bbb222ccc000" }
 *         name: { type: string, example: "질문" }
 *         active: { type: boolean, example: true }
 *         createdAt: { type: string, format: date-time, example: "2025-10-04T01:30:00.000Z" }
 *         updatedAt: { type: string, format: date-time, example: "2025-10-04T01:30:00.000Z" }
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;