import mongoose from "mongoose";

const QuestionPartSchema = new mongoose.Schema({
        type : { type : String, enum: ["text", "highlight"], required: true },
        content : { type : String, required: true },
}, { _id : false });

const QuizSchema = new mongoose.Schema({
        techniqueId: { type: mongoose.Schema.Types.ObjectId, ref: "Technique", required: true },
        rawQuestion: { type: String, required: true }, // 원문 질문
        questionParts : { type: [QuestionPartSchema], required: true }, // 질문 파트 배열
        questionType: {
                type: String,
                enum : ["short","choice"],
                default: "short"
        },
        choices: {
                type: [
                        {
                                label: { type: String, enum: ["A", "B", "C"], required: true },
                                content: { type: String, required: true }
                        },
                ],
                validate: {
                        validator: function(v) {
                                if(this.questionType ==="choice") return Array.isArray(v) && v.length >= 2;
                                return true;
                        },
                        message: "선택형 문제는 정확히 2개의 보기(A/B)가 필요합니다."
                },
                default: []
        },
        correctAnswer: { // 정답
                type: String, 
                required: true,
                validate : {
                        validator: function(val) {
                                if(this.questionType ==="choice") return ["A","B","C"].includes(val);
                                return typeof val === "string" && val.length > 0;
                        },
                        message: "정답 형식이 올바르지 않습니다."
                },
         }, 
        explanation: { type: String , default: ""},   // 정답 해설
        
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;