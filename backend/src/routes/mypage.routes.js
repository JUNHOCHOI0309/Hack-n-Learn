// 마이페이지 관련 라우트
import { Router } from "express";
import * as mypageController from "../controllers/mypage.controller.js";
import requireLogin from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/", requireLogin, mypageController.getMyPage);

export default router;