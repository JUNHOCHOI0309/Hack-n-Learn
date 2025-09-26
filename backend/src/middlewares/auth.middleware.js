import Joi from "joi";
import router from "../routes/index.js";

const registerSchema = Joi.object({
        id : Joi.string().alphanum().min(3).max(30).required(),
        nickname : Joi.string().min(2).max(30).required(),
        password : Joi.string().min(6).max(128).required(),
});

export const validateRegister = (req, res, next) => {
        const { error } = registerSchema.validate(req.body);
        if (error) {
                return res.status(400).json({ message: error.details[0].message });
        }
        next();
}

export const requireLogin = (req, res, next) => {
        if(!req.session.userId) {
                return res.status(401).json({ message: "Not authenticated" });
        }
        next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || '서버 내부 오류 발생' });
};


export const sessionTimeout = (req, res, next) => {
  if(req.session){
    if(!req.session.lastAccess){
      req.session.lastAccess = Date.now();
    } else if(Date.now() - req.session.lastAccess > 30 * 60 * 1000) {
      req.session.destroy(() => {
        return res.status(440).json({ message: "Session expired" });
      });
      return;
    } else {
      req.session.lastAccess = Date.now();
    }
  }
  next();
};
