import mongoose, { connect } from "mongoose";
import logger from './logger.js';

let cachedConnection = null;

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection;
        }

        if (cachedConnection) {
            return await cachedConnection;
        }

        logger.info('Spawning a fresh database connection pool connection...');
        cachedConnection = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, 
        });

        await cachedConnection;
        logger.info('Connected to Database');
        return mongoose.connection;
    } catch (error) {
        logger.error({ err: error }, 'Database connection failed');
        cachedConnection = null;
        throw error;
    }
}

export default connectDB;