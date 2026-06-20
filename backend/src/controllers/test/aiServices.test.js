import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockCreate = vi.fn();

vi.mock('groq-sdk', () => ({
	default: vi.fn().mockImplementation(() => ({
		chat: { completions: { create: mockCreate } },
	})),
}));

import generateInterviewReport from '../aiServices.js';

describe('generateInterviewReport', () => {
	beforeEach(() => mockCreate.mockReset());

	it('returns a parsed, schema-valid report', async () => {
		mockCreate.mockResolvedValue({
			choices: [{
				message: {
					content: JSON.stringify({
						matchScore: 78,
						technicalQuestions: [{ question: 'q', intention: 'i', answer: 'a' }],
						behavioralQuestions: [{ question: 'q', intention: 'i', answer: 'a' }],
						skillGaps: [{ skill: 'Docker', severity: 'medium', description: 'd' }],
						preparationPlan: [{ day: 'Day 1', focus: 'DSA', tasks: ['task1'] }],
						jobTitle: 'Backend Engineer',
					}),
				},
			}],
		});

		const report = await generateInterviewReport({
			resume: 'resume text', selfDescription: 'self', jobDescription: 'job',
		});

		expect(report.jobTitle).toBe('Backend Engineer');
		expect(mockCreate).toHaveBeenCalledTimes(1);
	});

	it('throws when the model returns malformed JSON', async () => {
		mockCreate.mockResolvedValue({ choices: [{ message: { content: 'not json' } }] });

		await expect(
			generateInterviewReport({ resume: 'r', selfDescription: 's', jobDescription: 'j' })
		).rejects.toThrow();
	});

	it('throws when the response violates the schema', async () => {
		mockCreate.mockResolvedValue({
			choices: [{ message: { content: JSON.stringify({ matchScore: 'not-a-number' }) } }],
		});

		await expect(
			generateInterviewReport({ resume: 'r', selfDescription: 's', jobDescription: 'j' })
		).rejects.toThrow();
	});
});