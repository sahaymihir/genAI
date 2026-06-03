import { Router } from "express";
import { loginUserController, registerUserController, logoutUserController, userProfileController } from "../../controllers/auth.controller.js";
import authUser from "../../middleware/authMiddleware.js";

const authRouter = Router();
/**
 * @route POST /api/auth/register
 * @description Register a user
 * @access Public
 */
authRouter.post('/register', registerUserController);


/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post('/login', loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Logout a user
 * @access Private
 */
authRouter.post('/logout', authUser, logoutUserController);

/**
 * @route GET /api/auth/profile
 * @description Get User details
 * @access Private
 */
authRouter.get('/profile', authUser, userProfileController);

export default authRouter;

