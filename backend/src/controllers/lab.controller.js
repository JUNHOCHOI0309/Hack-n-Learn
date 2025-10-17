import * as labService from '../services/lab.service.js';

export const createLab = async (req, res, next) => {
        try {
                const userId = req.user.id;
                const { problemId } = req.body;

                const lab = await labService.createLabInstance(userId, problemId);
                res.json({ success: true, data: lab });
        } catch (error) {
                next(error);
        }
};

