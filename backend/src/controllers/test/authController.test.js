import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../app.js';

describe('Auth flow', () => {
	const user = {
		username: 'flowuser',
		email: 'flow@example.com',
		password: 'password123',
		confirmPassword: 'password123',
	};

	it('registers, logs in, fetches profile, and logs out', async () => {
		const agent = request.agent(app); // persists cookies across calls

		const registerRes = await agent.post('/api/auth/register').send(user);
		expect(registerRes.status).toBe(201);

		const loginRes = await agent
			.post('/api/auth/login')
			.send({ email: user.email, password: user.password });
		expect(loginRes.status).toBe(200);

		const profileRes = await agent.get('/api/auth/profile');
		expect(profileRes.status).toBe(200);
		expect(profileRes.body.user.email).toBe(user.email);

		const logoutRes = await agent.post('/api/auth/logout');
		expect(logoutRes.status).toBe(200);

		// token is blacklisted now — should be rejected
		const afterLogout = await agent.get('/api/auth/profile');
		expect(afterLogout.status).toBe(401);
	});

	it('rejects duplicate registration', async () => {
		await request(app).post('/api/auth/register').send(user);
		const res = await request(app).post('/api/auth/register').send(user);
		expect(res.status).toBe(400);
	});

	it('rejects wrong password on login', async () => {
		await request(app).post('/api/auth/register').send(user);
		const res = await request(app)
			.post('/api/auth/login')
			.send({ email: user.email, password: 'wrongpassword' });
		expect(res.status).toBe(401);
	});
});