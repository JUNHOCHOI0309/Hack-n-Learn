import * as newsService from "../services/news.service.js";

export const getNewsList = async (req, res) => {
        try {
                const { page = 1, limit = 10 } = req.query;
                const newsList = await newsService.fetchBoanNewsList(page, limit);
                res.json({success: true, data: newsList});
        } catch (error) {
                console.error("Error fetching news list:", error);
                res.status(500).json({ error: "Failed to fetch news list" });
        }
};

export const getNewsDetail = async (req, res) => {
        const { id } = req.params;
        try {
                const newsDetail = await newsService.fetchBoanNewsDetail(id);
                res.json({success: true, data: newsDetail});
        } catch (error) {
                console.error("Error fetching news detail:", error);
                res.status(500).json({ error: "Failed to fetch news detail" });
        }
};
