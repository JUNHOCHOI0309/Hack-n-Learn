import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        id: { type: String, required: true, unique: true },
        nickname: { type: String, required: true },
        passwordHash: { type: String },
        email: { type: String, unique: true, sparse: true, required: true },
        provider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
        oauthId: { type: String, unique: true, sparse: true }, // OAuth 사용자의 고유 ID 저장
        linkedAccounts: {
                google :{
                        id : { type: String, default: null },
                        email : { type: String, default: null },
                },
                github :{
                        id : { type: String, default: null },
                        email : { type: String, default: null },
                }
        },
        role : { type: String, enum: ['user', 'admin'], default: 'user' },
        tier : { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' },
        points : { type: Number, default: 0 },
        createdAt : { type: Date, default: Date.now },
        updatedAt : { type: Date, default: Date.now },
        lastLogin : { type: Date },
        isActive : { type: Boolean, default: true },        
        profileImageId : { type : mongoose.Schema.Types.ObjectId, default: null },
        isProfileComplete: { type: Boolean, default: true }, // 프로필 완성 여부
}, { timestamps: true });

export default mongoose.model("User", userSchema);
        