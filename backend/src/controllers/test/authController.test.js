import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../app.js';

describe('POST /api/auth/register', () => {
	it('rejects mismatched passwords', async () => {
		const res = await request(app).post('/api/auth/register').send({
			username: 'testuser',
			email: 'test@example.com',
			password: 'password123',
			confirmPassword: 'password124',
		});

		expect(res.status).toBe(400);
	});

	it('rejects an invalid email', async () => {
		const res = await request(app).post('/api/auth/register').send({
			username: 'testuser',
			email: 'not-an-email',
			password: 'password123',
			confirmPassword: 'password123',
		});

		expect(res.status).toBe(400);
	});
});