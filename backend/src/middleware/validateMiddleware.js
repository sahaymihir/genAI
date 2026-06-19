const validate = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		res.status(400);
		const firstError = result.error.issues[0];
		throw new Error(`${firstError.path.join('.')}: ${firstError.message}`);
	}

	req.body = result.data;
	next();
};

export default validate;
