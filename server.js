import express from "express";
const server = express();
import urlsRouter from "./routes/urls.js";

server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.send("testing");
});

server.use("/urls", urlsRouter);

export default server;
