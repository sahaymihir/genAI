import Groq from 'groq-sdk';
import { z } from 'zod';

const ai = new Groq({ apiKey: process.env.GROQ_API_KEY });

const interviewReportSchema = z.object({
	matchScore: z.number().min(0).max(100),
	technicalQuestions: z.array(
		z.object({
			question: z.string(),
			intention: z.string(),
			answer: z.string(),
		})
	),
	behavioralQuestions: z.array(
		z.object({
			question: z.string(),
			intention: z.string(),
			answer: z.string(),
		})
	),
	skillGaps: z.array(
		z.object({
			skill: z.string(),
			severity: z.enum(['low', 'medium', 'high']),
			description: z.string(),
		})
	),
	preparationPlan: z.array(
		z.object({
			day: z.string(),
			focus: z.string(),
			tasks: z.array(z.string()),
		})
	),
	jobTitle: z.string(),
});

const generateInterviewReport = async ({
	resume,
	selfDescription,
	jobDescription,
}) => {
	const prompt = `You are an expert technical recruiter and career coach. Analyze the candidate information and job description to generate a comprehensive interview preparation report. Write all answers as plain prose only — do not include code snippets, curly braces, or special characters in any answer field.

				## Candidate Resume
				${resume}

				## Candidate Self-Description
				${selfDescription}

				## Job Description
				${jobDescription}`;
	const response = await ai.chat.completions.create({
		model: 'openai/gpt-oss-120b',
		messages: [
			{
				role: 'user',
				content: prompt,
			},
		],
		response_format: {
			type: 'json_schema',
			json_schema: {
				name: 'interview_report',
				schema: z.toJSONSchema(interviewReportSchema),
			},
		},
	});

	const parsed = JSON.parse(response.choices[0].message.content);

	return interviewReportSchema.parse(parsed);
};

export default generateInterviewReport;
