//기법 기본 정보
import mongoose from "mongoose";

const TechniqueSchema = new mongoose.Schema({
        slug: { type: String, required: true, unique: true, lowercase: true }, // URL 친화적 식별자
        title: { type: String, required: true, trim: true }, // 공격 기법 이름 (예: "XSS")
        imageUrl: { type: String },              // 이미지, 다이어그램 경로
        outline: { type: String },            // 공격 기법 개요
        tags : { type: [String], default: []  }, //기법 태그
}, { timestamps: true });

TechniqueSchema.index({ slug: 1 }, { unique: true });

const Technique = mongoose.model("Technique", TechniqueSchema);

export default Technique;