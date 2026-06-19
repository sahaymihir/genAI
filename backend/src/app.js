import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRouter from './routes/authRoutes.js';
import interviewRouter from './routes/interviewRoutes.js';
import pinoHttp from 'pino-http';
import logger from './config/logger.js';
const app = express();

// Middleware
app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || 'http://localhost:5173',
		credentials: true,
	})
);

// Get Auth Routes
app.use('/api/auth', authRouter);
app.use('/api/report', interviewRouter);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
