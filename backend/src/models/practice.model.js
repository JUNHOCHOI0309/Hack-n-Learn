//실습 영역 결과 모델
import mongoose from 'mongoose';

const practiceSchema = new mongoose.Schema({
        user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // 사용자 참조 ID
        problem : { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true }, // 문제 참조 ID
        result : { type : String , enum: ['success', 'fail'], required: true },
        score : { type : Number, default: 0 },
        usedHint: { type : Number, default: 0 },
        solvedAt : { type : Date, default: Date.now },

        //실습 환경 관리
        problemName : { type: String, default: null }, //실습 환경 이름
        labUrl : { type: String, default: null }, //실습 환경 URL
        expiresAt : { type: Date, default: null }, //실습 환경 만료 시간
        }, { timestamps: true }
);

const Practice = mongoose.model('Practice', practiceSchema);
export default Practice;