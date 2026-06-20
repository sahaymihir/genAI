import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';

vi.mock('pdf-parse', () => ({
	PDFParse: vi.fn().mockImplementation(() => ({
		getText: vi.fn().mockResolvedValue({ text: 'John Doe Resume Text' }),
		destroy: vi.fn(),
	})),
}));

vi.mock('../../services/aiServices.js', () => ({
	default: vi.fn().mockResolvedValue({
		matchScore: 80,
		technicalQuestions: [],
		behavioralQuestions: [],
		skillGaps: [],
		preparationPlan: [],
		jobTitle: 'Backend Engineer',
	}),
}));

import app from '../../app.js';

describe('POST /api/report/resume', () => {
	const user = {
		username: 'reportuser',
		email: 'report@example.com',
		password: 'password123',
		confirmPassword: 'password123',
	};

	it('rejects unauthenticated uploads', async () => {
		const res = await request(app)
			.post('/api/report/resume')
			.attach('resume', Buffer.from('%PDF-1.4 fake'), 'resume.pdf');
		expect(res.status).toBe(401);
	});

	it('generates a report for an authenticated user', async () => {
		const agent = request.agent(app);
		await agent.post('/api/auth/register').send(user);

		const res = await agent
			.post('/api/report/resume')
			.field('selfDescription', 'I am a backend dev')
			.field('jobDescription', 'Looking for a backend engineer')
			.attach('resume', Buffer.from('%PDF-1.4 fake'), 'resume.pdf');

		expect(res.status).toBe(201);
		expect(res.body.data.jobTitle).toBe('Backend Engineer');
	});

	it('rejects non-pdf uploads', async () => {
		const agent = request.agent(app);
		await agent.post('/api/auth/register').send(user);

		const res = await agent
			.post('/api/report/resume')
			.field('selfDescription', 'd')
			.field('jobDescription', 'd')
			.attach('resume', Buffer.from('not a pdf'), 'resume.txt');

		expect(res.status).toBe(400);
	});
});