import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../src/models/blacklist.model.js';

const authUser = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('No token');
    }
    const checkBlacklist = await blacklistTokenModel.findOne({ token });
    if (checkBlacklist) {
        res.status(401);
        throw new Error('Token not Valid');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401);
        throw new Error('Invalid token');
    }
});

export default authUser;
