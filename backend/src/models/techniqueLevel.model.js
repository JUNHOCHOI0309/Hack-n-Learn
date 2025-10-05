import mongoose  from "mongoose";

const TechniqueLevelSchema = new mongoose.Schema({
        techniqueId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Technique",
                required: true,
        },
        description: { type: String },           // 단계별 세부 설명
        exampleCode: { type: String },           // 공격 예시 코드
        order: { type: Number },                 // 단계/정렬 순서
}, { timestamps: true });
        
const TechniqueLevel = mongoose.model("TechniqueLevel", TechniqueLevelSchema);

export default TechniqueLevel;