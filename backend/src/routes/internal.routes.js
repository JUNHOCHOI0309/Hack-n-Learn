import express from "express";
import Practice from "../models/practice.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/auth-lab", async (req, res) => {
        try {
                const uri = req.get("X-Original-URI") || req.originalUrl;
                const match = uri.match(/^\/lab\/([0-9]{4})\//);
                if(!match) return res.sendStatus(403);

                const port = parseInt(match[1]);
                const userId = req.user?._id;

                if(!userId) return res.sendStatus(401);

                const practice = await Practice.findOne({ port, status: 'running' });
                if(!practice) return res.sendStatus(404);

                if(practice.userId.toString() !== userId.toString()) {
                        return res.sendStatus(403);
                }
                return res.sendStatus(200);
        } catch (error) {
                console.error("[auth-lab]",error);
                return res.sendStatus(500);
        }
});
export default router;