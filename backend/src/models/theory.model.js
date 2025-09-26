import mongoose from "mongoose";

const TechniqueSchema = new mongoose.Schema({
        title: { type: String, required: true }, // 공격 기법 이름 (예: "XSS")
        slug : { type: String, required: true, unique: true }, // URL 친화적 이름 (예: "stroed-xss")
        description: { type: String }, // 공격 기법 상세 설명
        warning: { type: String , default: "[경고] 학습 외 악용 금지" }, // 주의사항
}, { timestamps: true });

const Technique = mongoose.model("Technique", TechniqueSchema);

export default Technique;