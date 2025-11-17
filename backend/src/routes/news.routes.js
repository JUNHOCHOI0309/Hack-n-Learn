// 보안 뉴스 관련 라우트
import { Router } from "express";
import * as newsController from "../controllers/news.controller.js";

const router = Router();

router.get("/:id", newsController.getNewsDetail);
router.get("/", newsController.getNewsList);

/**
 * @swagger
 * tags:
 *   name: News
 *   description: 보안 뉴스(BoanNews) 크롤링 API
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: 보안 뉴스 목록 조회 (크롤링, 페이징)
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
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/NewsListItem'
 */

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: 보안 뉴스 상세 조회 (크롤링)
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 * components:
 *   schemas:
 *     NewsListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "140363"
 *         title:
 *           type: string
 *           example: "북한 해커, JSON 서비스 이용 악성코드 은밀 배포…개발자 개인정보·암호화폐 탈취 시도"
 *         link:
 *           type: string
 *           example: "https://www.boannews.com/media/view.asp?idx=140363"
 *         image:
 *           type: string
 *           example: "https://www.boannews.com/media/upFiles2/2025/11/1117%20nh%20th.png"
 *         writer:
 *           type: string
 *           example: "여이레 기자"
 *         date:
 *           type: string
 *           example: "2025년 11월 17일 11:45"
 *         summary:
 *           type: string
 *           example: "북한 해커 그룹이 주도하는 컨테이저스 인터뷰 캠페인이..."
 *
 *     NewsDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "140363"
 *         title:
 *           type: string
 *           example: "북한 해커, JSON 서비스 이용 악성코드 은밀 배포…"
 *         content:
 *           type: string
 *           example: "북한 해커 그룹이 주도하는 컨테이저스 인터뷰 캠페인이..."
 *         images:
 *           type: array
 *           description: 본문 내부의 이미지 URL 배열
 *           items:
 *             type: string
 *             example: "https://www.boannews.com/media/upFiles2/2025/11/1117%20nh%20th.png"
 */



export default router;