import expressAsyncHandler from 'express-async-handler';

import blacklistTokenModel from '../src/models/blacklist.model.js';
import userModel from '../src/models/user.models.js';
import generateToken from '../utils/generateToken.js';

/**
 * @name registerUserController
 * @description Register a new User
 * @access Public
 */
const registerUserController = expressAsyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400);
        throw new Error('Password and Confirm Password donot match');
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
        res.status(400);
        throw new Error('User with same Username/Email already exists');
    }

    const user = await userModel.create({
        username,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            msg: 'User Created Successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

/**
 * @name loginUserController
 * @description Login a user
 * @access Public
 */
const loginUserController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            msg: 'User Logged In Successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email/Password');
    }
});

/**
 * @name logoutUserController
 * @description Logout a user
 * @access Private
 */

const logoutUserController = expressAsyncHandler(async (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        await blacklistTokenModel.create({ token });
    }

    res.clearCookie('jwt');
    res.status(200).json({ msg: 'User logged out successfully' });
});

/**
 * @name userProfileController
 * @description Get User details
 * @access Private
 */
const userProfileController = expressAsyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await userModel.findById(userId).select('-password');
    if (user) {
        res.status(200).json({
            msg: 'User details fetched successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    loginUserController,
    logoutUserController,
    registerUserController,
    userProfileController,
};
