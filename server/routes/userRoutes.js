import express from 'express';
import {registerUser,loginUser,logoutUser} from '../controllers/userController.js'
import { authenticate } from '../config/auth.js';

const router = express.Router();

router.post("/register", registerUser );

router.post("/login", loginUser );

router.post("/logout" , authenticate , logoutUser )

export default router;