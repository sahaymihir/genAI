import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRouter from './routes/authRoutes.js';
import interviewRouter from './routes/interviewRoutes.js';
const app = express();

// Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

// Get Auth Routes
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
