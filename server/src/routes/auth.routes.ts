import express from "express";
import AuthController from "../controllers/auth.controller";
import verifyTokenAndRole from "../middlewares/auth.middleware";
import validateDto from "../middlewares/validateRequest.middleware";


const router = express.Router();

// Đăng nhập
router.post("/login",loginLimiter,validateDto(LoginDto) ,AuthController.login);

export default router;