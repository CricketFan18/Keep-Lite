import bcrypt from "bcrypt";
import User from "../models/User.js";
import { registerSchema, loginSchema } from "../validators/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function registerUser(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    const errorMsg = parsed.error.errors[0].message;
    return res.status(400).json({ success: false, message: errorMsg });
  }

  const { name, email, password } = parsed.data;

  //   if (!email || !password)
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "Required fields missing" }); Redundant if using ZOD

  try {
    const existing = await User.findOne({ email });

    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 11);
    await User.create({
      name: name,
      email: email,
      password: hashed,
    });

    res.status(201).json({ success: true, message: "User registered" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
}

export async function loginUser(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {    
    const errorMsg = parsed.error.errors[0].message;
    return res.status(400).json({ success: false, message: errorMsg });
  }

  const { email, password } = parsed.data;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });  

    const authToken = jwt.sign( { userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    
    res.cookie("token", authToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ success: true, message: "User logged in" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errorMsg: err });
  }
}

export function logoutUser(req, res) {
  try {
    res.clearCookie("token",{
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ success: true, message: "User logged out" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err });
  }
}