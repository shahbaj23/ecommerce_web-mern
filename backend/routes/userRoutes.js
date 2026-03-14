import express from 'express';
import { login, register, adminLogin, getUsers } from '../controller/userController.js';
import { authUser } from '../middleware/auth.js';

const userRouter = express.Router();   

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/admin', adminLogin);
userRouter.get('/all-users', getUsers)

export default userRouter;
