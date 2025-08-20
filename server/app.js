import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
const app = express();

connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/user' , userRoutes );
app.use('/api/notes', noteRoutes );

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});