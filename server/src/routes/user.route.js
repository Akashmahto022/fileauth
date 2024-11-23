import express from 'express'
import {register, login, logout,} from '../controllers/user.controller.js'
// import {upload} from '../middlewares/multer.middleware.js'
import { tokenVerify } from '../middlewares/jwt.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)

export default userRouter