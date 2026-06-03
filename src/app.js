import express from 'express';
import connectDB from './config/database.js';
import authRouter from './routes/auth.routes.js';
import { notFound,errorHandler } from '../middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
const app = express();


// Database
connectDB();


// Middleware
app.use(express.json());
app.use(cookieParser());

// Get Auth Routes
app.use('/api/auth', authRouter);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;