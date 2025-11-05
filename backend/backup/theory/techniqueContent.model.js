// 상단 개요, 하단 방어 및 체크리스트 구역
import mongoose from "mongoose";

const TechniqueContentSchema = new mongoose.Schema({
        techniqueId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Technique",
                required : true,
        },
        // 섹션 구분 : overview (상단 개요), reference (하단 참고자료)
        section: {
                type : String,
                enum : ["overview", "reference"],
                required : true,
        },
        order : { type : Number, required: true }, // 섹션 내 정렬 순서
        title : { type: String, required: true, trim : true }, // 섹션 제목
        contentType : {
                type : String,
                enum : [ "markdown", "html", "block"],
                default : "markdown",
        },
        /**
         * raw: 원본 콘텐츠
         * - contentType이 markdown인 경우: Markdown 원문
         * - contentType이 html인 경우: HTML 원문
         * - contentType이 blocks인 경우: JSON 객체 (Editor.js/Tiptap 구조)
         */
        raw: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
        },
        /**
         * html: 서버에서 변환 후 sanitize된 HTML (Markdown 렌더링 결과)
         * - 서버에서 pre-rendering 시 생성됨
         * - 프론트에서는 이 필드를 그대로 safe innerHTML로 사용 가능
         */
        html: {
                type: String,
        },

        blocks: {
                type : [ mongoose.Schema.Types.Mixed ],
                default: undefined,
        },

        sanitized : { type : Boolean, default : false },
        sanitizedAt : { type : Date },


}, { timestamps: true });


TechniqueContentSchema.index({ techniqueId: 1, section: 1, order: 1 }, { unique: true });

TechniqueContentSchema.index({
  title: "text",
  raw: "text",
  html: "text",
});

const TechniqueContent = mongoose.model("TechniqueContent", TechniqueContentSchema);

export default TechniqueContent;