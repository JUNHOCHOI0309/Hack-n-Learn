import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
        try{
                const user = await authService.register(req.body);
                req.session.userId = user._id;
                res.status(201).json({ message: "Signup success", userId: user._id, nickname: user.nickname });
        } catch (error) {
                next(error);
        }
};

export const login = async (req, res, next) => {
        try {
                const user = await authService.login(req.body);
                req.session.userId = user._id;
                res.json({ message: "Login success", userId: user._id, nickname: user.nickname, tier: user.tier });
        } catch (error) {
                next(error);

        }
};

export const logout = (req, res, next) => {
        try{
                req.session.destroy((err) => {
                        if(err) return next(err);
                        res.clearCookie('connect.sid');
                        res.json({ message: "Logout success" });
                });
        } catch (error) {
                next(error);
        }
};

export const me = async (req, res, next) => {
        try {
                if (!req.session.userId) {
                        return res.status(401).json({ message: "Not authenticated" });
                }
                res.json({ message: " Authenticated User ",userId: req.session.userId });
        } catch (error) {
                next(error);
        }
};