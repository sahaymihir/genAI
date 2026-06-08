import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: [true, 'Token is needed']
    }
}, {
    timestamps: true
})

const blacklistTokenModel = mongoose.model('blacklistTokens',blacklistTokenSchema);

export default blacklistTokenModel;