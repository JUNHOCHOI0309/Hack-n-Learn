import { Router } from "express";
import * as labController from "../controllers/lab.controller.js";

const router = Router();

router.post("/create", labController.createLab);

export default router;