import { WebSocketServer } from "ws";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { me } from "../controllers/auth.controller.js";

const onlineUsers = new Map(); // userId -> ws

export const initCommentSocket = (server) => {
        const wss = new WebSocketServer({ server, path: "/ws/comments" });

        wss.on("connection", (ws, req) => {
                console.log("Client connected to comment socket");

                try{
                        wss.on("message", (message) => {
                                const data = JSON.parse(message.toString());
                                if(data.type === "register" && data.userId) {
                                        onlineUsers.set(data.userId, ws);
                                        ws.userId = data.userId;
                                        console.log(`User ${data.userId} registered for comment notifications`);
                                }
                        });
                } catch (error) {
                        console.error("Error handling message:", error);
                }

                ws.on("close", () => {
                        console.log(`Client disconnected from comment socket`);
                        onlineUsers.delete(ws.userId);
                });
        });
};
        
export const sendCommentNotification = async ({targetUserId, payload}) => {
        const client = onlineUsers.get(targetUserId);
        if(client && client.readyState === 1) {
                client.send(JSON.stringify(payload));
                
        }
};