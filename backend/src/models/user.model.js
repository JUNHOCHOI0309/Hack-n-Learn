import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        id: { type: String, required: true, unique: true },
        nickname: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role : { type: String, enum: ['user', 'admin'], default: 'user' },
        tier : { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' },
        points : { type: Number, default: 0 },
        createdAt : { type: Date, default: Date.now },
        updatedAt : { type: Date, default: Date.now },
        lastLogin : { type: Date },
        isActive : { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
        