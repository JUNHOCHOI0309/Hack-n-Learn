//로그인 페이지
import e, { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register" , authController.register);
router.post("/login" , authController.login);
router.post("/logout" , authController.logout);
router.get("/me" , authController.me); // 현재 로그인한 사용자 정보 조회

router.post("social/:provider", (req,res)=> {res.send("social login: ${req.params.provider}")});
router.post("/find-id", (req, res)=> { res.send("find id")});
router.post("/reset-password", (req, res)=> {res.send("reset password")});

export default router;