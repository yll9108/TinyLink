import fs from "fs";
import express from "express";
import path from "path";
import cookieSession from "cookie-session";
import Keygrip from "keygrip";
const server = express();
import urlsRouter from "./routes/urls.js";

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

const __dirname = path.resolve();

server.get("/", (req, res) => {
    res.render("login", { root: __dirname });
});

const userDataPath = path.join(__dirname, "models/users.json");
const userData = fs.readFileSync(userDataPath, "utf-8");
const users = JSON.parse(userData);

server.post("/", (req, res) => {
    console.log(req.body);
    // res.send("HEllo");

    const { email, password } = req.body;
    const userArray = Object.values(users);
    const user = userArray.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        req.session.user = user;
        console.log("req.session.user", req.session.user);
        res.redirect("/urls");
    } else {
        res.status(401).send("Invaild email or password");
    }
});

server.use("/urls", urlsRouter);

export default server;
