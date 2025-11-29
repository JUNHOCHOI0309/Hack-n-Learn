import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        views : { type: Number, default: 0 },
}, { timestamps: true });

newsSchema.set("toJSON", {
        transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
        }
}); // toJSON 설정

const News = mongoose.model("News", newsSchema);

export default News;