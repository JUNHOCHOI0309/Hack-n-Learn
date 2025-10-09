import * as mypageService from "../services/mypage.service.js";

export const getMyPage = async (req, res) => {
    try {
        const userId = req.session?.user?._id || req.session?.userId;
        if (!userId) {
            return res.status(401).json({ error: "Mypage Unauthorized" });
        }
        const data = await mypageService.getMyPageData(userId);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching my page data:", error);
        return res.status(500).json({ success: false, error: "MyPage Internal Server Error" });
    }
};