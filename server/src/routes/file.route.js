import express from 'express'
import {uploadFile, getFile} from '../controllers/file.controller.js'
import {upload} from '../middlewares/multer.js'
import { tokenVerify } from '../middlewares/jwt.js';

const fileRouter = express.Router();

fileRouter.post('/file-upload',tokenVerify, uploadFile)
fileRouter.get('/get-file',tokenVerify, getFile)
export default fileRouter