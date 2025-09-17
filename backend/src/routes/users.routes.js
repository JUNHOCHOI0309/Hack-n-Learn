// 마이페이지 관련 라우트
import { Router } from "express";
const router = Router();

router.get("/me", (req, res) => {res.send("내 정보 조회(닉네임, 티어, 포인트 등)");});
router.put("/me", (req, res) => {res.send("내 정보 수정(닉네임, 비밀번호 등)");});

router.get("/me/progress", (req, res) => {res.send("내 학습 진도율 조회");});
router.get("/me/history", (req, res) => {res.send("내 풀이 이력 조회");});
router.get("/me/report", (req, res) => {res.send("내 활동 리포트 조회");});

export default router;