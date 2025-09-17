// 이론 학습 관련 라우트
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => { res.send("이론 학습 페이지"); });
router.get("/methods", (req, res) => { res.send("세부 기법 목록"); });
router.get("/methods/:id", (req, res) => { res.send(`이론 학습 세부 기법 ${req.params.id} 내용`); });
router.get("/methods/:id/quiz", (req, res) => { res.send(`이론 학습 세부 기법 ${req.params.id} 퀴즈`); });
router.post("/methods/:id/quiz", (req, res) => { res.send(`이론 학습 세부 기법 ${req.params.id} 퀴즈 제출`); });

export default router;