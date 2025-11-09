import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: OTP cho đăng ký và quên mật khẩu
 */

/**
 * @swagger
 * /api/users/send-verification-code:
 *   post:
 *     summary: Gửi mã OTP qua email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - purpose
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               purpose:
 *                 type: string
 *                 enum: [register, reset-password]
 *                 example: "register"
 *     responses:
 *       200:
 *         description: OTP đã được gửi
 */
router.post("/send-verification-code", UserController.sendVerificationCode);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Đổi mật khẩu bằng OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "matkhauMoi123"
 *     responses:
 *       200:
 *         description: Mật khẩu đã được thay đổi
 */
router.post("/reset-password", UserController.resetPassword);

export default router;
