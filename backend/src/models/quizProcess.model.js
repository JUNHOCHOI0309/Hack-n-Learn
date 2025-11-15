//유저별 퀴즈 풀이 현황
import mongoose from 'mongoose';

const QuizProcessSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        techniqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technique', required: true },
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
        status : { type: String, enum: ['not_started', 'in_progress', 'solved'], default: 'not_started' },
        lastAnswer : { type: String, default: null }, // 사용자가 마지막으로 제출한 답변
        lastCorrect : { type: Boolean, default: false }, // 마지막 답변이 정답인지 여부
        attempts : { type: Number, default: 0 }, // 시도 횟수
        lastAnsweredAt : { type: Date, default: Date.now }, // 마지막 답변 제출 시간
}, { timestamps: true });

QuizProcessSchema.index({ userId: 1, quizId: 1 }, { unique: true });

const QuizProcess = mongoose.model('QuizProcess', QuizProcessSchema);

export default QuizProcess;