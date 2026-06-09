import mongoose from 'mongoose';

/**
 * -Job Description: String
 * - Resume: String
 * - Self Description: String
 *
 * - matchScore: Number
 * - Technical Questions: [{
 *              question: String,
 *             intention: String,
 *             answer: String,
 *            }]
 *
 * - Behavioral Questions: [{
 *              question: String,
 *             intention: String,
 *             answer: String,
 *            }]
 * - Skill Gaps: [{
 *             skill: String,
 *             severity: {
 *                  type: String,
 *                  enum: [low,medium,high],
 *            },
 *            }]
 * - Preparation Plan: [{
 *           day: String,
 *           focus: String,
 *          tasks: [String],
 *          }]
 */

const technicalQuestionSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		intention: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

const behavioralQuestionSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		intention: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

const skillGapsSchema = new mongoose.Schema(
	{
		skill: {
			type: String,
			required: true,
		},
		severity: {
			type: String,
			enum: ['low', 'medium', 'high'],
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

const preparationPlanSchema = new mongoose.Schema({
	day: {
		type: String,
		required: true,
	},
	focus: {
		type: String,
		required: true,
	},
	tasks: [
		{
			type: String,
			required: true,
		},
	],
});

const interviewReportSchema = new mongoose.Schema({
	jobDescription: {
		type: String,
		required: true,
	},
	resume: {
		type: String,
	},
	selfDescription: {
		type: String,
	},
	matchScore: {
		type: Number,
		min: 0,
		max: 100,
	},
	technicalQuestions: [technicalQuestionSchema],
	behavioralQuestions: [behavioralQuestionSchema],
	skillGaps: [skillGapsSchema],
	preparationPlan: [preparationPlanSchema],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	}
});

const interviewReportModel = mongoose.model(
	'InterviewReport',
	interviewReportSchema
);

export default interviewReportModel;
