import { Router } from "express";
const router = Router();

router.post("/problems", (req, res) => {res.send("관리자 - 문제 등록");});
router.put("/problems/:id", (req, res) => {res.send(`관리자 - 문제 수정 ${req.params.id}`);});
router.delete("/problems/:id", (req, res) => {res.send(`관리자 - 문제 삭제 ${req.params.id}`);});

router.post("/news", (req, res) => {res.send("관리자 - 보안 뉴스 글 작성");});
router.put("/news/:id", (req, res) => {res.send(`관리자 - 보안 뉴스 글 수정 ${req.params.id}`);});
router.delete("/news/:id", (req, res) => {res.send(`관리자 - 보안 뉴스 글 삭제 ${req.params.id}`);});

export default router;