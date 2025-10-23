// 이론 학습 관련 라우트
import express from "express";
import { listTechniques, getTechniqueWithLevels, getLevelDetail } from "../controllers/theory.controller.js";
import { postGenerateQuiz, getQuizzesByLevel, postAnswerQuiz, getWrongNotes } from "../controllers/quiz.controller.js";
import { requireLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Theory
 *     description: 공격 기법 이론 학습 API
 */

/**
 * @swagger
 * /api/theory/techniques:
 *   get:
 *     summary: 모든 공격 기법 목록 조회
 *     tags: [Theory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 기법 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Technique'
 *     description: |
 *       등록된 모든 공격 기법(예: SQL Injection, XSS 등)의
 *       기본 정보를 조회합니다.
 */

/**
 * @swagger
 * /api/theory/techniques/{slug}:
 *   get:
 *     summary: 특정 기법 상세 조회 (이론 + 단계 목록 + 참고자료)
 *     tags: [Theory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         
 *     responses:
 *       200:
 *         description: 특정 기법 상세 정보
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
 *                     technique:
 *                       $ref: '#/components/schemas/TechniqueDetail'
 *                     overview:
 *                       type: array
 *                       description: 이론 개요 섹션
 *                       items:
 *                         $ref: '#/components/schemas/TechniqueContent'
 *                     levels:
 *                       type: array
 *                       description: 실습 단계 목록
 *                       items:
 *                         $ref: '#/components/schemas/TechniqueLevel'
 *                     reference:
 *                       type: array
 *                       description: 참고자료 및 방어법 섹션
 *                       items:
 *                         $ref: '#/components/schemas/TechniqueContent'
 *       404:
 *         description: 존재하지 않는 기법
 *     description: |
 *       특정 기법(slug)에 대한 상세 정보를 반환합니다.
 *       반환값에는 technique(기본 정보), overview(이론 섹션 리스트),
 *       levels(단계 요약 리스트), reference(방어 원칙/체크리스트) 항목이 포함됩니다.
 */

/**
 * @swagger
 * /api/theory/techniques/{slug}/levels/{order}:
 *   get:
 *     summary: 특정 기법의 특정 단계(Level) 상세 조회
 *     tags: [Theory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: 기법 slug
 *       - in: path
 *         name: order
 *         required: true
 *         schema:
 *           type: integer
 *         description: 레벨 순서 (order)
 *     responses:
 *       200:
 *         description: 해당 단계 상세 반환
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
 *                     technique:
 *                       $ref: '#/components/schemas/TechniqueBasic'
 *                     level:
 *                       $ref: '#/components/schemas/TechniqueLevelDetail'
 *       404:
 *         description: 존재하지 않는 레벨
 *     description: |
 *       지정한 기법(slug)의 order에 해당하는 단계 정보를 반환합니다.
 *       level에 상세 설명(description)과 exampleCode가 포함됩니다.
 */

/**
 * @swagger
 * tags:
 *   - name: Quiz
 *     description: 학습 퀴즈 API
 */

/**
 * @swagger
 * /api/theory/quiz/generate:
 *   post:
 *     summary: 퀴즈 생성 (최초 요청 시 AI/Preset → DB 저장)
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - techniqueId
 *               - levelId
 *             properties:
 *               techniqueId:
 *                 type: string
 *                 example: "65f123abcde7890123456789"
 *               levelId:
 *                 type: string
 *                 example: "66a111bbb222ccc333ddd444"
 *     responses:
 *       200:
 *         description: 퀴즈 생성 결과
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
 *                     technique:
 *                       $ref: '#/components/schemas/TechniqueBasic'
 *                     level:
 *                       $ref: '#/components/schemas/LevelSummary'
 *                     quizzes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Quiz'
 *                     created:
 *                       type: boolean
 *                       example: true
 *                     from:
 *                       type: string
 *                       example: "ai"
 *     description: |
 *       주어진 techniqueId와 levelId로 퀴즈를 생성합니다.
 *       최초 생성 시 AI 또는 사전 정의된 템플릿을 사용하여 문제를 만들고 DB에 저장합니다.
 */

/**
 * @swagger
 * /api/theory/quiz/{slug}/levels/{order}:
 *   get:
 *     summary: 특정 Technique + Level에 대한 퀴즈 목록 조회
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Technique slug
 *       - in: path
 *         name: order
 *         required: true
 *         schema:
 *           type: integer
 *         description: Level order
 *     responses:
 *       200:
 *         description: 퀴즈 목록 반환
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
 *                     technique:
 *                       $ref: '#/components/schemas/TechniqueBasic'
 *                     level:
 *                       $ref: '#/components/schemas/LevelSummary'
 *                     quizzes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/QuizSummary'
 *     description: |
 *       특정 기법(slug)과 단계(order)에 해당하는 퀴즈 목록을 반환합니다.
 *       반환되는 quizzes 항목은 문제 요약(질문, 선택지, 생성일자 등)을 포함합니다.
 */

/**
 * @swagger
 * /api/theory/quiz/{quizId}/answer:
 *   post:
 *     summary: 퀴즈 정답 제출 및 채점
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: 퀴즈 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userAnswer
 *             properties:
 *               userAnswer:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: 채점 결과
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
 *                     correct:
 *                       type: boolean
 *                       example: false
 *                     userAnswer:
 *                       type: integer
 *                       example: 2
 *                     correctAnswer:
 *                       type: integer
 *                       example: 0
 *                     explanation:
 *                       type: string
 *                       example: "SQL Injection은 입력값 검증 부족이 원인입니다."
 *     description: |
 *       사용자가 제출한 정답(userAnswer)을 채점하고 결과(정답 여부, 정답 인덱스, 해설 등)를 반환합니다.
 */

/**
 * @swagger
 * /api/theory/quiz/{quizId}/wrong-notes:
 *   get:
 *     summary: 오답노트 조회 (필터: techniqueId, levelId)
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: 퀴즈 ID (특정 퀴즈의 오답 기록 조회용; 생략 시 전체 오답노트 필터 사용)
 *       - in: query
 *         name: techniqueId
 *         required: false
 *         schema:
 *           type: string
 *         description: Technique ID 필터
 *       - in: query
 *         name: levelId
 *         required: false
 *         schema:
 *           type: string
 *         description: Level ID 필터
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: 오답노트 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WrongNote'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     size:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 1
 *     description: |
 *       사용자의 오답 기록(오답노트)을 조회합니다. techniqueId, levelId로 필터링 가능하고,
 *       페이징 파라미터(page, size)를 지원합니다.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Technique:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f123abcde7890123456789"
 *         slug:
 *           type: string
 *           example: "sql-injection"
 *         title:
 *           type: string
 *           example: "SQL Injection"
 *         imageUrl:
 *           type: string
 *           example: "/uploads/sql.png"
 *         outline:
 *           type: string
 *           example: "DB 쿼리 조작 공격"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["injection", "database", "web"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T10:00:00Z"
 *
 *     TechniqueDetail:
 *       allOf:
 *         - $ref: '#/components/schemas/Technique'
 *         - type: object
 *           properties:
 *             overview:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TechniqueContent'
 *             reference:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TechniqueContent'
 *
 *     TechniqueContent:
 *       type: object
 *       description: >
 *         특정 기법(Technique)의 개요·설명·방어 원칙 등 이론 콘텐츠 데이터.
 *         Markdown 또는 Blocks 형태로 구성될 수 있습니다.
 *       properties:
 *         _id:
 *           type: string
 *           example: "6717c13f1d3a3b75d8b8e001"
 *         techniqueId:
 *           type: string
 *           example: "6717c13f1d3a3b75d8b8e001"
 *         section:
 *           type: string
 *           enum: [overview, reference]
 *           example: "overview"
 *         order:
 *           type: integer
 *           example: 3
 *         title:
 *           type: string
 *           example: "3. XSS 종류"
 *         contentType:
 *           type: string
 *           enum: [markdown, html, blocks]
 *           example: "blocks"
 *         raw:
 *           type: string
 *           description: Markdown 또는 HTML 원문 (contentType이 markdown/html인 경우)
 *           example: "# XSS란 무엇인가?\\n공격자가 악성 스크립트를 삽입하여..."
 *         html:
 *           type: string
 *           description: 서버에서 sanitize된 HTML
 *           example: "<h2>XSS란 무엇인가?</h2><p>공격자가...</p>"
 *         blocks:
 *           type: array
 *           description: 블록 기반 구조 (contentType이 'blocks'인 경우)
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "cardGroup"
 *               data:
 *                 type: object
 *                 properties:
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: "저장형 (Stored) XSS"
 *                         description:
 *                           type: string
 *                           example: "공격자가 입력(게시판 댓글, 리뷰 등)에 악성 스크립트를 저장..."
 *         sanitized:
 *           type: boolean
 *           example: true
 *         sanitizedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-23T12:00:00Z"
 *       example:
 *         techniqueId: "6717c13f1d3a3b75d8b8e001"
 *         section: "overview"
 *         order: 3
 *         title: "3. XSS 종류"
 *         contentType: "blocks"
 *         blocks:
 *           - type: "cardGroup"
 *             data:
 *               items:
 *                 - title: "저장형 (Stored) XSS"
 *                   description: "공격자가 입력(게시판 댓글, 리뷰 등)에 악성 스크립트를 저장 → 다른 사용자가 페이지를 열면 실행"
 *                   risk: "매우 높음"
 *                 - title: "반사형 (Reflected) XSS"
 *                   description: "악성 스크립트가 URL 파라미터/POST 데이터에 포함되어 즉시 실행"
 *                   risk: "높음"
 *                 - title: "DOM 기반 (Client-side) XSS"
 *                   description: "서버 응답은 안전하지만, 브라우저 내 JS가 클라이언트 데이터를 DOM에 반영할 때 발생"
 *                   risk: "중간"
 *         published: true
 *
 *     TechniqueLevel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66a111bbb222ccc333ddd444"
 *         order:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "기초 단계"
 *         summary:
 *           type: string
 *           example: "WHERE 절 조건 우회"
 *
 *     TechniqueLevelDetail:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66a111bbb222ccc333ddd444"
 *         order:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "기초 단계"
 *         description:
 *           type: string
 *           example: "SQL Injection의 기본 원리를 이해합니다."
 *         exampleCode:
 *           type: string
 *           example: "SELECT * FROM users WHERE id='1' OR '1'='1';"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T11:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T11:00:00Z"
 *
 *     TechniqueBasic:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f123abcde7890123456789"
 *         slug:
 *           type: string
 *           example: "sql-injection"
 *         title:
 *           type: string
 *           example: "SQL Injection"
 *
 *     LevelSummary:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66a111bbb222ccc333ddd444"
 *         order:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "기초 단계"
 *
 *     Quiz:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "670aaa111bbb222ccc333ddd"
 *         techniqueId:
 *           type: string
 *           example: "65f123abcde7890123456789"
 *         levelId:
 *           type: string
 *           example: "66a111bbb222ccc333ddd444"
 *         question:
 *           type: string
 *           example: "SQL Injection의 주요 원인은?"
 *         choices:
 *           type: array
 *           items:
 *             type: string
 *           example: ["입력값 검증 부족", "강력한 비밀번호 사용", "네트워크 방화벽 미설정"]
 *         correctAnswer:
 *           type: integer
 *           example: 0
 *         explanation:
 *           type: string
 *           example: "입력값 검증 부족이 가장 큰 원인입니다."
 *         source:
 *           type: string
 *           example: "ai"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T12:00:00Z"
 *
 *     QuizSummary:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "670aaa111bbb222ccc333ddd"
 *         question:
 *           type: string
 *           example: "SQL Injection의 주요 원인은?"
 *         choices:
 *           type: array
 *           items:
 *             type: string
 *           example: ["입력값 검증 부족", "강력한 비밀번호 사용", "네트워크 방화벽 미설정"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T12:00:00Z"
 *         source:
 *           type: string
 *           example: "ai"
 *
 *     WrongNote:
 *       type: object
 *       properties:
 *         quizId:
 *           type: string
 *           example: "670aaa111bbb222ccc333ddd"
 *         techniqueId:
 *           type: string
 *           example: "65f123abcde7890123456789"
 *         levelId:
 *           type: string
 *           example: "66a111bbb222ccc333ddd444"
 *         question:
 *           type: string
 *           example: "SQL Injection의 주요 원인은?"
 *         choices:
 *           type: array
 *           items:
 *             type: string
 *           example: ["입력값 검증 부족", "강력한 비밀번호 사용", "네트워크 방화벽 미설정"]
 *         userAnswer:
 *           type: integer
 *           example: 2
 *         correctAnswer:
 *           type: integer
 *           example: 0
 *         explanation:
 *           type: string
 *           example: "입력값 검증 부족이 가장 큰 원인입니다."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-26T12:30:00Z"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


// 모든 카테고리(기법) 목록 조회
// GET /api/theory/techniques
router.get("/techniques", requireLogin, listTechniques);

// 카테고리별 레벨 목록 조회 (Form 선택용)
// GET /api/theory/techniques/:slug/levels
router.get("/techniques/:slug", requireLogin, getTechniqueWithLevels);

// 레벨별 상세 이론 조회
// GET /api/theory/techniques/:slug/levels/:order
router.get("/techniques/:slug/levels/:order", requireLogin, getLevelDetail);


// 퀴즈 생성 (최초 요청 시 AI/Preset → DB에 저장)
// POST /api/theory/quiz/generate
router.post("/quiz/generate", requireLogin, postGenerateQuiz);

// 특정 Technique + Level에 대한 퀴즈 목록 조회
// GET /api/theory/quiz/:slug/levels/:order
router.get("/quiz/:slug/levels/:order", requireLogin, getQuizzesByLevel);


// 퀴즈 정답 제출 및 채점 ( 한 문제 한 문제에 대한 답안 제출 )
// POST /api/theory/quiz/:quizId/answer
router.post("/quiz/:quizId/answer", requireLogin, postAnswerQuiz);

// 오답노트 조회 (필터: techniqueId, levelId)
// GET /api/theory/quiz/:quizId/wrong-notes
router.get("/quiz/:quizId/wrong-notes", requireLogin, getWrongNotes);



export default router;