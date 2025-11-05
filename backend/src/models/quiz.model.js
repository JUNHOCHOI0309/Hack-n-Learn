import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
        techniqueId: { type: mongoose.Schema.Types.ObjectId, ref: "Technique", required: true },
        question: { type: String, required: true },       // 문제 텍스트
        choices: { type: [String], required: true, validate: v => v.length >=2 }, // 선택지 배열
        correctAnswer: { type: Number, required: true }, // 정답 (choices 중 하나)
        explanation: { type: String , default: ""},   // 정답 해설
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;