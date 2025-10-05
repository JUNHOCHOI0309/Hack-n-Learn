import * as adminService from "../services/admin.service.js";

export const deletePost = async (req, res) => {
        try {
                await adminService.deletePost(req.params.id);
                res.json({ success: true, message: "삭제 성공" });
        } catch (error) {
                res.status(500).json({ message: "삭제 실패" });
        }
};

export const deleteComment = async (req, res) => {
        try {
                await adminService.deleteComment(req.params.id);
                res.json({ success: true, message: "삭제 성공" });
        } catch (error) {
                res.status(500).json({ message: "삭제 실패" });
        }
};