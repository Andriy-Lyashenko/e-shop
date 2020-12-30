import express from 'express';
const router = express.Router();
import {authUser, getUserProfile, registerUser} from '../controllers/userControllers.js';
import protect from '../middlewares/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', authUser);
router.get('/profile',protect, getUserProfile)

export default router