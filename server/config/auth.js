import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticate(req,res,next) {
    //console.log(req.cookies);    
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({success: false , message: "No token"});
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userID = decoded.userID;
        next();
    } catch (err) {
        return  res.status(403).json({ message: "Invalid or expired token", error: err });
    }
}
