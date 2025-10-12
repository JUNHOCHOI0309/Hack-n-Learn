//로그인 페이지
import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/auth.middleware.js";
import * as authService from "../services/auth.service.js";
import passport from "passport";

const router = Router();

router.post("/register" , validateRegister,authController.register);
router.post("/login" , authController.login);
router.post("/logout" , authController.logout);

router.get("/me" , authController.me); // 현재 로그인한 사용자 정보 조회
router.post("/complete-profile" , authController.completeProfile);

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", failureFlash: true }), (req, res) => {
        //res.json({ message: "Google login success", userId: req.user._id, nickname: req.user.nickname, isProfileComplete: req.user.isProfileComplete });
        res.redirect("/api/main");
});

router.get("/kakao", passport.authenticate("kakao"));
router.get("/kakao/callback", passport.authenticate("kakao", { failureRedirect: "/login", failureFlash: true}), (req, res) => {
        //res.json({ message: "Kakao login success", userId: req.user._id, nickname: req.user.nickname , isProfileComplete: req.user.isProfileComplete });
        res.redirect("/api/main");
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login", failureFlash: true }), (req, res) => {
        //res.json({ message: "GitHub login success", userId: req.user._id, nickname: req.user.nickname , isProfileComplete: req.user.isProfileComplete });
        res.redirect("/api/main");
});

router.post("/send-verification-code", async (req, res, next) => {
        try{
                const { email } = req.body;
                await authService.sendVerificationCode(email);
                res.json({ message: "Verification code sent" });
        } catch (error) {
                next(error); 
        }
});

router.post("/verify-code", async (req, res, next) => {
        try{
                const { email, code } = req.body;
                await authService.verifyEmailCode(email, code);
                res.json({ message: "Email verified successfully" });
        } catch (error) {
                next(error); 
        }
});

router.post("/find-id", async (req, res, next)=> { 
        try{
                const { email } = req.body;
                const id = await authService.findIdByEmail(email);
                res.json({ message: "User ID found", id });
        }
        catch(error){
                next(error);
        }      
});
router.post("/reset-password", async (req, res, next)=> {
        try{
                const { id, email } = req.body;
                const token = await authService.createPasswordResetToken(id, email);

                res.json({ message: "Password reset email sent if the user exists." });
        }catch(error){
                next(error);
        }
});
router.post("/reset-password/:token", async (req, res, next)=> {
        try{
                const { token } = req.params;
                const { newPassword } = req.body;
                 if (!newPassword || newPassword.length < 6) {
                        return res.status(400).json({ message: "비밀번호는 최소 6자리 이상이어야 합니다" });
                }
                await authService.resetPassword(token, newPassword);
                res.json({ message: "Password has been reset successfully." });
        } catch(error){
                next(error);
        }
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 관련 API
 */

/**
 * @swagger
 * /api/auth/send-verify-code:
 *   post:
 *     summary: 회원가입 시 이메일 인증번호 발송
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: 인증번호 발송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verification code sent
 *       400:
 *         description: 잘못된 이메일 형식 또는 발송 실패
 */

/**
 * @swagger
 * /api/auth/verify-code:
 *   post:
 *     summary: 이메일 인증번호 확인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified
 *       400:
 *         description: 인증번호 불일치 또는 만료
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 회원가입 (이메일 인증 완료 후)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: juho123
 *               nickname:
 *                 type: string
 *                 example: 주호
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Signup success
 *                 userId:
 *                   type: string
 *                   example: 66f2e6...
 *                 nickname:
 *                   type: string
 *                   example: 주호
 *       400:
 *         description: 이메일 미인증 또는 중복 정보 존재
 */

export default router;