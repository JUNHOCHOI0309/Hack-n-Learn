import Practice from "../models/practice.model.js";
import { v4 as uuidv4 } from "uuid";

export const createLabInstance = async (userId, problemId) => {
        const expiredAt = new Date(Date.now() + 60 * 60 * 1000); // 1시간 후 만료
        const sessiondId = uuidv4();

        const labUrl = `http://localhost:4000/lab/${sessiondId}/index.html'; `

        await Practice.updateOne(
                { user: userId, problem: problemId },
                {
                        $set: { labUrl, expiredAt },
                        $setOnInsert: { result: "fail", solvedAt: new Date() },
                },
                { upsert: true }
        );
        return { labUrl, expiredAt };
};