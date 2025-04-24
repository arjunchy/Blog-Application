import express from 'express';

import { signupUser, loginUser } from '../controller/user-controller.js';
// import { uploadImage, getImage } from '../controller/image-controller.js';
// import upload from '../utils/upload.js';

import { createPost, getAllPosts, getPost, deletePost, updatePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment, getComment, deleteComment } from '../controller/comment-controller.js';


const router = express.Router();

router.post('/signup', signupUser);
router.post('/login',loginUser);

// router.post('/file/upload',upload.single('file'),uploadImage);
// router.get('/file/:filename',getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.delete('/post/:id', authenticateToken, deletePost);
router.put('/post/:id', authenticateToken, updatePost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComment);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;
