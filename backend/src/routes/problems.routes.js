// 문제 관련 라우트
import { Router } from "express";
import * as problemController from "../controllers/problem.controller.js";
import requireLogin from "../middlewares/auth.middleware";
import { validateQuery, validateBody } from "../middlewares/validateQuery.js";
const router = Router();

router.get("/", requireLogin, validateQuery('getProblems'), problemController.getProblems);
router.get("/:id", requireLogin, validateQuery('getProblemById'), problemController.getProblemById);
router.post("/:id/submit", requireLogin, validateBody('submitFlag'), problemController.submitFlag);
router.post("/:id/request-hint", requireLogin, validateBody('requestHint'), problemController.requestHint);
export default router;