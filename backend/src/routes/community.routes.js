// 문의 게시판 관련 라우트
import { Router } from "express";
const router = Router();

router.get("/questions", (req, res) => {res.send("문의 게시판 목록");});
router.get("/questions/:id", (req, res) => {res.send(`문의 게시판 상세 ${req.params.id}`);});
router.post("/questions", (req, res) => {res.send("문의 게시판 글 작성");});
router.put("/questions/:id", (req, res) => {res.send(`문의 게시판 글 수정 ${req.params.id}`);});
router.delete("/questions/:id", (req, res) => {res.send(`문의 게시판 글 삭제 ${req.params.id}`);});

export default router;