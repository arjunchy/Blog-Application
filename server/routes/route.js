import express from 'express';

import { signupUser, loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

import { createPost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';


const router = express.Router();

router.post('/signup', signupUser);
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);

router.post('/create', authenticateToken, createPost);


export default router;
