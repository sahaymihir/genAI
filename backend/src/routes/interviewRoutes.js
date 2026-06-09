import express from 'express';
import { Router } from 'express';
import { resumeController } from '../controllers/interviewController.js';
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

export default interviewRouter;
