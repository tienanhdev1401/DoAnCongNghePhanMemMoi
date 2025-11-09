import express, { Application, Request, Response, NextFunction } from 'express';
import "reflect-metadata"; 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import http from "http";

dotenv.config(); // load env

// Configs & routes
import { AppDataSource } from "./config/database";
import "./config/passport"; // register authentication strategies
import authRouter from "./routes/auth.routes";
import oauthRoutes from "./routes/oauth.routes";
import userRouter from "./routes/user.routes";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";


const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(passport.initialize()); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const server = http.createServer(app);

// Mount REST API routes
app.use('/api/auth', authRouter);
app.use('/api/auth', oauthRoutes);
app.use('/api/users', userRouter);

// Global error handler keeps consistent JSON responses
app.use(errorHandlingMiddleware);



// Kết nối và sync TypeORM
const PORT = 5000;
AppDataSource.initialize().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('TypeORM connected & synced');
    console.log(`📑 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}).catch((err: Error) => {
  console.error('TypeORM connection failed:', err);
});