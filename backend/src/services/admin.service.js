import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const deletePost = async (id) => {
        await Comment.deleteMany({ postId: id });
        return await Post.findByIdAndDelete(id);
};

export const deleteComment = async (id) => {
        return await Comment.findByIdAndDelete(id);
};