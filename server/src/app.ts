import express, { Application, Request, Response, NextFunction } from 'express';
import "reflect-metadata"; 
import dotenv from 'dotenv'
import mysql from 'mysql2'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import http from "http";

dotenv.config(); // load env

// Configs & routes
import { AppDataSource } from "./config/database";
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import oauthRoutes from './routes/oauth.routes'
import lessonRouter from './routes/lesson.routes'
import './config/passport.js'   // chạy file config để đăng ký strategy
import errorHandlingMiddleware from './middlewares/errorHandling.middleware'
import { limiter } from './middlewares/ratelimit.middleware'
import uploadRouter from './routes/upload.routes'
import { swaggerUi, swaggerSpec } from "./config/swagger";

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(passport.initialize()); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(limiter);

// Khởi tạo socket
const server = http.createServer(app);

app.use('/api/auth', authRouter);
app.use("/api/auth", oauthRoutes);
app.use('/api/users', userRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/lessons',lessonRouter);



// swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlingMiddleware);


// Kết nối và sync TypeORM
const PORT = Number(process.env.PORT) || 5000;

AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("TypeORM connected & synced");
      console.log(`📑 Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize data source", error);
    process.exit(1);
  });