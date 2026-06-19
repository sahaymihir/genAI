import express from 'express';
import { Router } from 'express';
import {
	resumeController,
	getReportByIdController,
	getAllReportsController,
} from '../controllers/interviewController.js';
import authUser from '../middleware/authMiddleware.js';
import upload from '../middleware/fileUploadMiddleware.js';

const interviewRouter = Router();

/**
 * @route POST /api/interview/resume
 * @description Upload a resume
 * @access Private
 */
interviewRouter.post(
	'/resume',
	authUser,
	upload.single('resume'),
	resumeController
);

/**
 * @route GET /api/interview/:id
 * @description Get interview report by id
 * @access Private
 */
interviewRouter.get('/:id', authUser, getReportByIdController);

/**
 * @route GET /api/interview/
 * @description Get all interview reports of the user
 * @access Private
 */
interviewRouter.get('/', authUser, getAllReportsController);

export default interviewRouter;
