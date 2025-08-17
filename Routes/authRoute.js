import express from "express"
import { askToAssistant, getCurrentUser, updateAssistant } from "../Controllers/user.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const authRouter = express.Router();

authRouter.get("/current",isAuth,getCurrentUser);
authRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant);
authRouter.post("/asktoassistant",isAuth,askToAssistant);

export default authRouter