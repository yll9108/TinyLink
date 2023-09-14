import express from "express";
const usersRouter = express.Router();

import { renderRegister, newUser } from "../controllers/auth.js";

usersRouter.get("/", renderRegister);
usersRouter.get("/newuser", renderRegister);
usersRouter.post("/newuser", newUser)



export default usersRouter;
