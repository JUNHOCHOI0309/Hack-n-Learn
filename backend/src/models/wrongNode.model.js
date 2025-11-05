import mongoose from "mongoose";

const WrongNoteSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        techniqueId: { type: mongoose.Schema.Types.ObjectId, ref: "Technique", required: true },
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },

        question: { type: String, required: true },       // 문제 텍스트
        choices: { type: [String], required: true},
        userAnswer: { type: Number, required: true }, // 사용자가 선택한 답 (choices 중 하나)
        correctAnswer: { type: Number, required: true }, // 정답 (choices 중 하나)
        explanation: { type: String , default: ""},   // 정답 해설
}, { timestamps: true });

const WrongNote = mongoose.model("WrongNote", WrongNoteSchema);
export default WrongNote;