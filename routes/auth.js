import express from "express";
export const usersRouter = express.Router();
export const loginRouter = express.Router();

import {
    renderRegister,
    newUser,
    renderLogin,
    checkACandSetCookie,
} from "../controllers/auth.js";

usersRouter.get("/", renderRegister);
usersRouter.get("/newuser", renderRegister);
usersRouter.post("/newuser", newUser);

loginRouter.get("/", renderLogin);
loginRouter.post("/", checkACandSetCookie);
