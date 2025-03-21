import express from 'express';

import { signupUser, loginUser } from '../controller/user-controller.js';
import { uploadImage } from '../controller/image-controller.js';


const router = express.Router();

router.post('/signup', signupUser);
router.post('/login',loginUser);
router.post('/file/upload',uploadImage);




export default router;
