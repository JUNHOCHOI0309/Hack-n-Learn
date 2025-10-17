// 문제 관련 라우트
import { Router } from "express";
import * as problemController from "../controllers/problems.controller.js";
import requireLogin from "../middlewares/auth.middleware.js";
import { validateQuery, validateBody } from "../middlewares/validateQuery.js";
const router = Router();

router.get("/", requireLogin, validateQuery('getProblems'), problemController.listProblems);
router.get("/:id", requireLogin, validateQuery('getProblemById'), problemController.getProblem);
router.post("/:id/submit", requireLogin, validateBody('submitFlag'), problemController.submitFlag);
router.post("/:id/request-hint", requireLogin, validateBody('requestHint'), problemController.requestHint);
export default router;