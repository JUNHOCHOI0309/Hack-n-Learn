// 보안 뉴스 관련 라우트
import { Router } from "express";
const router = Router();

router.get("/news", (req, res) => {res.send("보안 뉴스 목록");});
router.get("/news/:id", (req, res) => {res.send(`보안 뉴스 상세 ${req.params.id}`);});
router.post("/news", (req, res) => {res.send("보안 뉴스 글 작성");});
router.put("/news/:id", (req, res) => {res.send(`보안 뉴스 글 수정 ${req.params.id}`);});
router.delete("/news/:id", (req, res) => {res.send(`보안 뉴스 글 삭제 ${req.params.id}`);});

export default router;