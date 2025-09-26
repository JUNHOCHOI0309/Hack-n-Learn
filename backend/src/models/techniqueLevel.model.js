import mongoose  from "mongoose";

const TechniqueLevelSchema = new mongoose.Schema({
        techniqueId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Technique",
                required: true,
        },
        description: { type: String },           // 단계별 간단설명
        theory: { type: String },                // 이론 설명 텍스트
        exampleCode: { type: String },           // 공격 예시 코드
        defense: { type: String },               // 방어 방법
        imageUrl: { type: String },              // 이미지, 다이어그램 경로
        warning: { type: String, default: '[경고] 학습 외 악용 금지' },
        order: { type: Number },                 // 단계/정렬 순서
}, { timestamps: true });
        
const TechniqueLevel = mongoose.model("TechniqueLevel", TechniqueLevelSchema);

export default TechniqueLevel;