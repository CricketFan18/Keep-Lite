import express from 'express';
import {registerUser,loginUser,logoutUser, verifyUser} from '../controllers/userController.js'
import { authenticate } from '../config/auth.js';
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per window
  message: { success: false, message: "Too many attempts, please try again later." }
});

const router = express.Router();

router.post("/register", registerUser );

router.post("/login", loginLimiter, loginUser);

router.post("/logout" , authenticate , logoutUser )

// Endpoint just for checking authentication status
router.get("/verify", authenticate, verifyUser);

export default router;