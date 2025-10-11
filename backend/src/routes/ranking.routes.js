import {Router} from 'express';
import * as rankingController from '../controllers/ranking.controller.js';
import requireLogin from '../middlewares/auth.middleware.js';


const router = Router();

router.get('/', rankingController.getRankings);
router.get('/me', requireLogin, rankingController.getMyRanking);

/**
 * @swagger
 * tags:
 *   name: Ranking
 *   description: 사용자 랭킹 관련 API
 */

/**
 * @swagger
 * /api/ranking:
 *   get:
 *     summary: 전체 랭킹 조회
 *     description: 사용자 점수를 기반으로 랭킹을 제공합니다.
 *     tags: [Ranking]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: 성공 시 랭킹 리스트 반환
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 totalUsers: 125
 *                 totalPages: 13
 *                 users:
 *                   - rank: 1
 *                     nickname: "Admin"
 *                     tier: "platinum"
 *                     points: 8000
 *
 * @swagger
 * /api/ranking/me:
 *   get:
 *     summary: 내 랭킹 조회
 *     description: 로그인한 사용자의 현재 랭킹, 티어, 점수를 반환합니다.
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: 성공 시 내 랭킹 반환
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 rank: 8
 *                 nickname: "CyberHero"
 *                 tier: "gold"
 *                 points: 4200
 *       401:
 *         description: 로그인하지 않은 경우
 */

export default router;
