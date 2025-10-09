//실습 영역 모델
import mongoose from 'mongoose';

const practiceSchema = new mongoose.Schema({
        user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        problem : { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
        result : { type : String , enum: ['success', 'fail'], required: true },
        score : { type : Number, default: 0 },
        usedHint: { type : Number, default: 0 },
        solvedAt : { type : Date, default: Date.now }
        }, { timestamps: true }
);
const Practice = mongoose.model('Practice', practiceSchema);
export default Practice;