import express, { Application, Request, Response, NextFunction } from 'express';
import "reflect-metadata"; 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import http from "http";
import { swaggerUi, swaggerSpec } from "./config/swagger";
import errorHandlingMiddleware from './middlewares/errorHandling.middleware'
import { limiter } from './middlewares/ratelimit.middleware'
import authRouter from './routes/auth.routes'



dotenv.config(); // load env

// Configs & routes
import { AppDataSource } from "./config/database";


const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(passport.initialize()); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const server = http.createServer(app);

app.use('/api/auth', authRouter);


// swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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