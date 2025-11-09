import express from "express";
import AuthController from "../controllers/auth.controller";
import verifyTokenAndRole from "../middlewares/auth.middleware";
import validateDto from "../middlewares/validateRequest.middleware";
import { loginLimiter, otpLimiter } from "../middlewares/ratelimit.middleware";
import { LoginDto } from "../dto/request/LoginDTO";



const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Quản lý xác thực
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */


/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Làm mới Access Token từ Refresh Token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Trả về accessToken mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token mới
 *       401:
 *         description: Không có refresh token hoặc refresh token không hợp lệ
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout thành công
 */


// Đăng nhập
router.post("/login",loginLimiter,validateDto(LoginDto) ,AuthController.login);

// Refresh token
router.post("/refresh", AuthController.refreshToken);

// Đăng xuất
router.post("/logout", AuthController.logout);

export default router;