import * as postTypeService from "../services/postType.service.js";

export const createPostType = async (req, res) => {
        try {
                const { type } = await postTypeService.create(req.body.name);
                res.status(201).json({ success: true, data: type });
        } catch (error) {
                res.status(500).json({ message: "생성 실패" });
        }
};

export const deletePostType = async (req, res) => {
        try {
                await postTypeService.remove(req.params.id);
                res.json({ success: true, message: "삭제 성공" });
        } catch (error) {
                res.status(500).json({ message: "삭제 실패" });
        }
};

export const getPostTypes = async (req, res) => {
        try {
                const types = await postTypeService.list();
                res.json({ success: true, data: types });
        } catch (error) {
                res.status(500).json({ message: "조회 실패" });
        }
};