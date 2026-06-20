import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 10, 
	standardHeaders: true,
	legacyHeaders: false,
	skip: () => process.env.NODE_ENV === 'development',
	message: { message: 'Too many attempts, please try again later' },
});

export default authLimiter;