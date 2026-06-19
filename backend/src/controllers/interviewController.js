import expressAsyncHandler from 'express-async-handler';
import { PDFParse } from 'pdf-parse';
import generateInterviewReport from '../services/aiServices.js';
import interviewReportModel from '../models/interviewReport.model.js';

const resumeController = expressAsyncHandler(async (req, res) => {
	if (!req.file) {
		res.status(400);
		throw new Error('No file uploaded');
	}
	if (req.file.mimetype != 'application/pdf') {
		res.status(400);
		throw new Error('Please upload a valid pdf file');
	}

	const parser = new PDFParse({ data: req.file.buffer });
	const result = (await parser.getText()).text;
	const { selfDescription, jobDescription } = req.body;

	const interviewReportByAi = await generateInterviewReport({
		result,
		selfDescription,
		jobDescription,
	});

	const interviewReport = await interviewReportModel.create({
		user: req.user.userId,
		resume: result,
		selfDescription,
		jobDescription,
		...interviewReportByAi,
	});

	res.status(201).json({
		msg: 'Interview Report Generated Successfully',
		data: interviewReport,
	});
});

const getReportByIdController = expressAsyncHandler(async (req, res) => {
	const userId = req.user.userId;
	const reportId = req.params.id;
	const report = await interviewReportModel.findOne({
		_id: reportId,
		user: userId,
	});

	if (!report) {
		res.status(404);
		throw new Error('Report not found');
	}

	res.status(200).json({
		message: `Interview report with id:${reportId} fetched successfully.`,
		report,
	});
});

const getAllReportsController = expressAsyncHandler(async (req, res) => {
	const userId = req.user.userId;
	const reports = await interviewReportModel
		.find({ user: userId })
		.sort({ createdAt: -1 })
		.select({
			resume: 0,
			jobDescription: 0,
			selfDescription: 0,
			__v: 0,
			technicalQuestions: 0,
			behavioralQuestions: 0,
			skillGaps: 0,
			preparationPlan: 0,
		});
	console.log(reports);
	res.status(200).json({
		message: 'Interview reports fetched successfully.',
		reports,
	});
});

export { resumeController, getReportByIdController, getAllReportsController };
