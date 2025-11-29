//실습 단계별 정보 ( level 1, level 2 ... )
import mongoose  from "mongoose";

const TechniqueLevelSchema = new mongoose.Schema({
        techniqueId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Technique",
                required: true,
        },
        order: { type: Number, required: true },                 // 단계/정렬 순서
        title : { type: String, required: true, trim: true },    // 예 : "Level 1 - 기본 XSS 공격"
        summary: { type: String },               // 목록에서 보이는 짧은 설명
        description: { type: String },           // 상세 설명 (Markdown 형식)
        exampleCode: { type: String },           // 예제 코드 (실습 환경에 반영)
}, { timestamps: true });

TechniqueLevelSchema.index({ techniqueId: 1, order: 1 }, { unique: true });
        
const TechniqueLevel = mongoose.model("TechniqueLevel", TechniqueLevelSchema);

export default TechniqueLevel;