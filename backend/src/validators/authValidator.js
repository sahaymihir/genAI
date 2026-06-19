import { z } from 'zod';

export const registerSchema = z.object({
	username: z.string().trim().min(3).max(30),
	email: z.string().trim().email(),
	password: z.string().min(8).max(72),
	confirmPassword: z.string().min(8).max(72),
});

export const loginSchema = z.object({
	email: z.string().trim().email(),
	password: z.string().min(1).max(72),
});
