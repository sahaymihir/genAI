import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema(
	{
		token: {
			type: String,
			unique: true,
			required: [true, 'Token is needed'],
		},
		expiresAt: {
			type: Date,
			required: true,
			index: { expires: 0 },
		},
	},
	{
		timestamps: true,
	}
);

const blacklistTokenModel = mongoose.model(
	'blacklistTokens',
	blacklistTokenSchema
);

export default blacklistTokenModel;
