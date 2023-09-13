import express from "express";
import path from "path";
const server = express();
import urlsRouter from "./routes/urls.js";

server.set("view engine", "ejs");

const __dirname = path.resolve();

server.get("/", (req, res) => {
    res.render("login", { root: __dirname });
});

server.use("/urls", urlsRouter);

export default server;
