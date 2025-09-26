import { generateQuiz, listQuizzesByLevel, answerQuiz, listWrongNotes } from "../services/quiz.service.js";

export async function postGenerateQuiz(req, res, next){
        try{
                const { techniqueId, levelId } = req.body;
                if(!techniqueId || !levelId){
                        return res.status(400).json({ success: false, message: "techniqueId, levelId 가 필요합니다." });
                }

                const result = await generateQuiz(techniqueId, levelId);
                if(result?.notFound){
                        return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다." });
                }
                return res.json({
                        success: true,
                        data:{
                                technique: result.technique,
                                level: result.level,
                                quizzes: result.quizzes,
                                created : !!result.created,
                                from: result.from || (result.created ? "ai" : "existing")
                        }
                });
        } catch(err){
                next(err);
        }
}

export async function getQuizzesByLevel(req, res, next) {
        try {
                const { techniqueId, levelId } = req.params;
                const result = await listQuizzesByLevel(techniqueId, levelId);
                if(result?.notFound){
                        return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다." });
                }
                return res.json({ success: true, data: result });
        } catch(err){
                next(err);
        }        
}

export async function postAnswerQuiz(req, res, next) {
        try{
                const userId = req.session?.userId;
                if(!userId) return res.status(401).json({ success: false, message: "로그인이 필요합니다." });

                const { quizId }  = req.params;
                const { userAnswer } = req.body;
                if(userAnswer === undefined) return res.status(400).json({ success: false, message: "userAnswer 가 필요합니다." });

                const result = await answerQuiz({ userId, quizId, userAnswer});
                if(result?.notFound){
                        return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다." });
                }
                return res.json({ success: true, data: result });
        } catch(err){
                next(err);
        }
}

export async function getWrongNotes(req, res, next) {
        try{
                const userId = req.session?.userId;
                if(!userId) return res.status(401).json({ success: false, message: "로그인이 필요합니다." });

                const { techniqueId, levelId } = req.query;
                const page = parseInt(req.query.page || "1" , 10);
                const size = parseInt(req.query.size || "20", 10);

                const result = await listWrongNotes({ userId, techniqueId, levelId, page, size });
                return res.json({ success: true, data: result.items, meta: result.meta });
        } catch(err){
                next(err);
        }
}