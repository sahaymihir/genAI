import express from 'express';
import connectDB from './config/database.js';
import authRouter from './routes/auth.routes.js';
import { notFound, errorHandler } from '../middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
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

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
