import express from 'express';
import { login, register, adminLogin } from '../controller/userController.js';

const userRouter = express.Router();   

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/admin', adminLogin);

export default userRouter;
