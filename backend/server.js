import 'dotenv/config'
import app from './src/app.js';
import connectDB from './src/config/database.js';
import validateEnv from './src/config/validateEnv.js';
import logger from './src/config/logger.js';
const PORT=process.env.PORT;

const startServer = async () => {
	try {
        validateEnv();
		await connectDB();
		app.listen(PORT, () => {
			logger.info(`Server Running on port ${PORT}`);
		});
	} catch (error) {
		logger.error({ err: error }, 'Failed to start server');
		process.exit(1);
	}
};

startServer();


