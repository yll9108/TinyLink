import express from "express";
import cookieSession from "cookie-session";
import Keygrip from "keygrip";
const server = express();
import urlsRouter from "./routes/urls.js";
import { usersRouter, loginRouter, logOutRouter } from "./routes/auth.js";

server.set("view engine", "ejs");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const keysList = Keygrip(["SEKRIT2", "SEKRIT1"], "sha256");

server.use(
    cookieSession({
        name: "session",
        keys: keysList,
        maxAge: 24 * 60 * 60 * 1000,
    })
);

server.use((req, res, next) => {
    req.session = req.session || {};
    next();
});

server.use("/", loginRouter);
server.use("/urls", urlsRouter);
server.use("/users", usersRouter);
server.use("/logout", logOutRouter);
export default server;
