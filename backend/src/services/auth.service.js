import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const register = async (id, nickname, password) => {
        const existingUser = await User.findOne({ $or: [{ id }, { nickname }] });
        if (existingUser) {
            throw new Error("id or nickname already in use");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ id, nickname, passwordHash });
        await user.save();
        return user;
}

export const login = async( id, password) => {
        const user = await User.findOne({ id });
        if(!user) throw new Error("can't find user");
        if(!user.isActive) throw new Error("user is deactivated");
        
        const valid = await bcrypt.compare(password, user.passwordHash);
        if(!valid) throw new Error("wrong password");

        user.lastLogin = new Date();
        await user.save();

        return user;
}