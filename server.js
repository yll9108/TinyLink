import express from "express";
import path from "path";
const server = express();
import urlsRouter from "./routes/urls.js";
import usersRouter from "./routes/auth.js"

server.set("view engine", "ejs");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

server.get("/", (req, res) => {
    res.render("login", { root: __dirname });
});

server.use("/urls", urlsRouter);
server.use("/users", usersRouter)

export default server;
