import express from "express";
const server = express();
import urlsRouter from "./routes/urls.js";

server.set("vies engine", "ejs");

server.get("/", (req, res) => {
    res.send("testing");
});

server.use("/login", urlsRouter);

export default server;
