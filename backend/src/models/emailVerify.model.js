import mongoose from "mongoose";

const emailVerifySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false }
});

emailVerifySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const EmailVerify = mongoose.model("EmailVerify", emailVerifySchema);

export default EmailVerify;
