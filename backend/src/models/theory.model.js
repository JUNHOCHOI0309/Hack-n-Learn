import mongoose from "mongoose";

const TechniqueSchema = new mongoose.Schema({
        title: { type: String, required: true }, // 공격 기법 이름 (예: "XSS")
        warning: { type: String , default: "[경고] 학습 외 악용 금지" }, // 주의사항
        imageUrl: { type: String },              // 이미지, 다이어그램 경로
        outline: { type: String },            // 공격 기법 개요
        description: { type: String }, // 공격 기법 상세 설명
        defense: { type: String },     // 방어 방법        
}, { timestamps: true });

const Technique = mongoose.model("Technique", TechniqueSchema);

export default Technique;