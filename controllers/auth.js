import { getAllUsers, validate } from "../helpers/users.js";
import { writeDataToFile, reading } from "../utils/updateDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const dbPath = "./models/users.json";

export const ifAuth = (req, res, next) => {
    const user = req.session.user;
    if (user) {
        next();
    } else {
        res.redirect("/");
    }
};

export const renderLogin = (req, res) => {
    const user = req.session.user;
    if (user) {
        return res.redirect("/urls");
    }
    res.render("login", { user, error: false, message: "" });
};

export const renderRegister = (req, res) => {
    res.render("register", { user: null, error: false, message: "" });
    // const users = getAllUsers()
    // res.send(users)
};

export const newUser = (req, res) => {
    if (
        req.body.name === " " ||
        req.body.email === " " ||
        req.body.password === ""
    ) {
        res.render("register", {
            error: true,
            message: "Please fill out all the fields.",
        });
    } else {
        const db = reading(dbPath);
        if (validate(req.body.email, db)) {
            res.render("register", {
                error: true,
                message: "User already registered",
            });
        } else {
            const saltRounds = 12;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            let id = uuidv4();
            const newUser = {
                id: id,
                name: req.body.name,
                email: req.body.email,
                password: hash,
            };
            writeDataToFile(dbPath, newUser);
            res.redirect("/");
        }
    }
};

export const checkACandSetCookie = (req, res) => {
    const users = getAllUsers();
    const { email, password } = req.body;
    const user = users.users.find((user) => user.email === email);
    console.log("user", user);
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = user;
                res.redirect("/urls");
                console.log("req.session.user", req.session.user);
            } else {
                // res.status(401).send("Invaild email or password");
                res.render("login", {
                    error: true,
                    message: "Invaild email or password",
                });
            }
        });
    } else {
        res.status(401).send("sth went wrong");
    }
};

export const deleteCookie = (req, res) => {
    req.session = null;
    res.redirect("/");
};
