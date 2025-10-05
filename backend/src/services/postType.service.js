import PostType from "../models/postType.model.js";

export const create = async(name) => {  
        const type = new PostType({ name });
        return await type.save();
};

export const remove = async(id) => {  
        return await PostType.findByIdAndDelete(id);
};

export const list = async() => {  
        return await PostType.find({ active: true }).sort({ createdAt: -1 });
}