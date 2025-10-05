// 보안 뉴스 관련 라우트
import { Router } from "express";
import * as newsController from "../controllers/news.controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const router = Router();

router.get("/", newsController.getNewsList);
router.get("/:id", validateObjectId, newsController.getNewsDetail);
/**
 * @swagger
 * tags:
 *   name: News
 *   description: 보안 뉴스(게시판) API
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: 뉴스 목록 조회 (페이징)
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 뉴스 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 2
 *                     totalPages:
 *                       type: integer
 *                       example: 21
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/NewsListItem'
 */

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: 뉴스 상세 조회
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 뉴스 ID
 *     responses:
 *       200:
 *         description: 뉴스 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/NewsDetail'
 *       404:
 *         description: 해당 뉴스 없음
 */

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: 뉴스 생성 (관리자 전용)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "최신 보안 취약점 제로데이 공개"
 *               content:
 *                 type: string
 *                 example: "<p>제로데이 취약점 발견...</p>"
 *     responses:
 *       201:
 *         description: 뉴스 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/NewsDetail'
 *       400:
 *         description: 유효성 검증 실패
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 */

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: 뉴스 수정 (관리자 전용)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 뉴스 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "수정된 보안 뉴스 제목"
 *               content:
 *                 type: string
 *                 example: "<p>수정된 내용...</p>"
 *     responses:
 *       200:
 *         description: 수정된 뉴스 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/NewsDetail'
 *       400:
 *         description: 유효성 검증 실패
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 뉴스 없음
 *
 *   delete:
 *     summary: 뉴스 삭제 (관리자 전용)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 뉴스 ID
 *     responses:
 *       204:
 *         description: 삭제 성공 (내용 없음)
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 권한 없음
 *       404:
 *         description: 뉴스 없음
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthorSimple:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: "adminUser"
 *
 *     NewsListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "66f123abcde7890123456789"
 *         title:
 *           type: string
 *           example: "최신 보안 취약점 제로데이 공개"
 *         content:
 *           type: string
 *           example: "<p>마이크로소프트 제품군에서 새로운 제로데이 취약점이 발견...</p>"
 *         author:
 *           $ref: '#/components/schemas/AuthorSimple'
 *         views:
 *           type: integer
 *           example: 128
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-25T10:12:34.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-25T10:12:34.000Z"
 *
 *     NewsDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "66f123abcde7890123456789"
 *         title:
 *           type: string
 *           example: "최신 보안 취약점 제로데이 공개"
 *         content:
 *           type: string
 *           example: "<h2>취약점 개요</h2><p>마이크로소프트 제품군에서 발견된 새로운 제로데이...</p><img src='https://example.com/security.png' alt='보안 이미지' />"
 *         author:
 *           $ref: '#/components/schemas/AuthorSimple'
 *         views:
 *           type: integer
 *           example: 129
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-25T10:12:34.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-25T10:12:34.000Z"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;