//기법 기본 정보
import mongoose from "mongoose";

const TechniqueSchema = new mongoose.Schema({
        slug: { type: String, required: true, unique: true, lowercase: true }, // URL 친화적 식별자
        title: { type: String, required: true, trim: true }, // 공격 기법 이름 (예: "XSS")
        level : { type: String, enum: ["쉬워요", "보통", "어려워요"], required: true }, // 난이도
        description: { type: String }, // 기법 설명 (간략)
}, { timestamps: true });

TechniqueSchema.index({ slug: 1 }, { unique: true });

const Technique = mongoose.model("Technique", TechniqueSchema);

export default Technique;