import { HttpStatusCode } from "axios";
import AuthService from "../services/auth.service";
import ApiError from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);
      
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(HttpStatusCode.Ok).json({ accessToken: result.accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refreshToken;
      if (!token)
        throw new ApiError(HttpStatusCode.Unauthorized, "Không có refresh token");

      const accessToken = await AuthService.refreshAccessToken(token);
      res.status(HttpStatusCode.Ok).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  static logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("refreshToken");
    res.status(HttpStatusCode.Ok).json({ message: "Logout thành công" });
  }

  
}

export default AuthController;
