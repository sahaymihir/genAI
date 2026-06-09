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

	res
		.status(201)
		.json({
			msg: 'Interview Report Generated Successfully',
			data: interviewReport,
		});
});

export { resumeController };
