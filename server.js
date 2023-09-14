import express from "express";
import path from "path";
import cookieSession from "cookie-session";
import Keygrip from "keygrip";
const server = express();
import urlsRouter from "./routes/urls.js";

server.set("view engine", "ejs");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// const keysList = Keygrip(["SEKRIT2", "SEKRIT1"], "sha256");

// server.use(
//     cookieSession({
//         name: "session",
//         keys: keysList,
//         maxAge: 24 * 60 * 60 * 1000,
//     })
// );
const __dirname = path.resolve();

server.get("/", (req, res) => {
    res.render("login", { root: __dirname });
});

server.post("/", (req, res) => {
    console.log("testing");
    res.redirect("/urls");

    // const formData = req.body;
    // try {
    //     console.log("server.post is working");
    //     res.send("Post request received");
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send("Internal Server Error");
    // }
});

server.use("/urls", urlsRouter);

export default server;
