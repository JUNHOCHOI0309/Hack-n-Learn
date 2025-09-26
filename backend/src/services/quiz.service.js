import mongoose from "mongoose";
import Technique from "../models/theory.model.js";
import TechniqueLevel from "../models/techniqueLevel.model.js";
import Quiz from "../models/quiz.model.js";
import PresetQuiz from "../models/presetQuiz.model.js";
import WrongNote from "../models/wrongNode.model.js";
import { generateQuizItemsViaAI} from "../utils/ai.client.js";

async function findTechniqueAndLevel({techniqueId, levelId}) {
        let technique;

        if(mongoose.Types.ObjectId.isValid(techniqueId)) {
                technique = await Technique.findById(techniqueId).lean();
        } else{
                technique = await Technique.findOne({ slug: techniqueId }).lean();
        }
        if(!technique) return { notFound: true };

        if(!mongoose.Types.ObjectId.isValid(levelId)) return { notFound: true };
        const level = await TechniqueLevel.findOne({ _id: levelId, techniqueId: technique._id }).lean();
        if(!level) return { notFound: true };

        return { technique, level };
}

export async function generateQuiz({ techniqueId, levelId}){
        const result = await findTechniqueAndLevel(techniqueId, levelId);
        if(result.notFound) return { notFound: true };

        const { technique, level } = result;

        const existing = await Quiz.find({ techniqueId: technique._id, levelId: level._id }).lean();
        if(existing.length > 0){
                return { technique, level, quizzes: existing , created: false};
        }

        let items;
        try{
                items = await generateQuizItemsViaAI({technique, level, limit:5});
        } catch {
                const presets = await PresetQuiz.find({ techniqueId: technique._id, levelId: level._id }).limit(5).lean();
                if(!presets.length){
                        return { technique, level, quizzes:[], created: false, from : "none"};
                }
                const created = await Quiz.insertMany(
                presets.map(p => ({
                        techniqueId: technique._id,
                        levelId: level._id,
                        question: p.question,
                        choices: p.choices,
                        correctAnswer: p.correctAnswer,
                        explanation: p.explanation,
                        source: "preset"
                }))
                );
                return { technique, level, quizzes: created, created: true, from: "preset" };
        }
        const created = await Quiz.insertMany(
                        presets.map(p => ({
                                techniqueId: technique._id,
                                levelId: level._id,
                                question: p.question,
                                choices: p.choices,
                                correctAnswer: p.correctAnswer,
                                explanation: p.explanation,
                                source: "ai"
                        }))
                );
        return { technique, level, quizzes: created, created: true, from: "ai" };
}

export async function listQuizzesByLevel(techniqueId, levelId){
        const result = await findTechniqueAndLevel(techniqueId, levelId);
        if(result.notFound) return { notFound: true };

        const { technique, level } = result;
        const quizzes = await Quiz.find({ techniqueId: technique._id, levelId: level._id })
                .select("_id question choices createdAt source")
                .sort({ createdAt: 1 })
                .lean();

        return { technique, level, quizzes };
}

export async function answerQuiz({ userId, quizId, userAnswer }){
        if(!mongoose.Types.ObjectId.isValid(quizId)) return { notFound: true };

        const quiz = await Quiz.findById(quizId).lean();
        if(!quiz) return { notFound: true };

        const correct = Number(userAnswer) === Number(quiz.correctAnswer);

        if(!correct){
                await WrongNote.create({
                        userId,
                        techniqueId: quiz.techniqueId,
                        levelId: quiz.levelId,
                        quizId: quiz._id,
                        question: quiz.question,
                        choices: quiz.choices,
                        userAnswer: Number(userAnswer),
                        correctAnswer: quiz.correctAnswer,
                        explanation: quiz.explanation
                });
        }

        return { correct, userAnswer: Number(userAnswer), correctAnswer: quiz.correctAnswer, explanation: quiz.explanation || "" };
}

export async function listWrongNotes({ userId, techniqueId, levelId, page=1, size =20 }){
        const query = { userId };
        if(techniqueId) query.techniqueId = techniqueId;
        if(levelId) query.levelId = levelId;

        const skip = (page -1) * size;

        const [ items, total ] = await Promise.all([
                WrongNote.find(query)
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(size)
                        .select("quizId techniqueId levelId question choices userAnswer correctAnswer explanation createdAt")
                        .lean(),
                WrongNote.countDocuments(query)
        ]);

        return { items, meta: { page, size, total }};
}