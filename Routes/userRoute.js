import express from "express"
import { Login, Logout, SignUp } from "../Controllers/auth.js";

const userRouter = express.Router();

userRouter.post("/signup",SignUp);
userRouter.post("/login",Login);
userRouter.get("/logout",Logout);

export default userRouter