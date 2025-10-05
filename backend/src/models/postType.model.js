import mongoose from "mongoose";

const postTypeSchema = new mongoose.Schema(
        {
                name: { type: String, required: true, unique: true, trim: true },
                active: { type: Boolean, default: true }
        },
        { timestamps: true }
);

const PostType = mongoose.model("PostType", postTypeSchema);

export default PostType;