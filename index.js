import express from "express"
import dotenv from "dotenv"
import connectdb from "./Config/db.js";
import userRouter from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./Routes/authRoute.js";
import geminiResponse from "./gemini.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assistica-frontend.onrender.com"
    ],
    credentials: true,
  })
);

app.use("/api/auth",userRouter);
app.use("/api/user",authRouter);

app.get("/",async (req,res) => {
    let prompt = req.query.prompt;
    let data = await geminiResponse(prompt);
    res.json(data);
})

app.listen(port,() => {
    connectdb();
    console.log("server started");
})