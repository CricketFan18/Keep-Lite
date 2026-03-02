import express from 'express';
import {registerUser,loginUser,logoutUser, verifyUser} from '../controllers/userController.js'
import { authenticate } from '../config/auth.js';

const router = express.Router();

router.post("/register", registerUser );

router.post("/login", loginUser );

router.post("/logout" , authenticate , logoutUser )

// Endpoint just for checking authentication status
router.get("/verify", authenticate, verifyUser);

export default router;