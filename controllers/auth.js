import { getAllUsers, validate } from "../helpers/users.js";
import { writeDataToFile, reading } from "../utils/updateDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";

const dbPath = "./models/users.json";

export const renderLogin = (req, res) => {
    res.render("login");
};

export const renderRegister = (req, res) => {
    res.render("register", { error: false, message: "" });
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

// const maxAge = 1 * 24 * 60 * 60;

// export const createToken = (id) => {
//     return jwt.sign({ id }, "random secret", {
//         expiresIn: maxAge,
//     });
//     // create a function whcih creates a token (with signature, payload,...)
// };

export const checkACandSetCookie = (req, res) => {
    const users = getAllUsers();
    const { email, password } = req.body;
    const user = users.users.find((user) => user.email === email);
    console.log("user", user);
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                // const token = createToken(user.id);
                // res.cookie("jwt", token, {
                //     httpOnly: true,
                //     maxAge: 1 * 24 * 60 * 60 * 1000,
                // });
                req.session.user = user;
                res.redirect("/urls");
                console.log("req.session.user", req.session.user);
            } else {
                res.status(401).send("Invaild email or password");
            }
        });
    } else {
        res.status(401).send("sth went wrong");
    }
};

// export const isAuth = (req, res, next) => {
//     const token = req.cookies.jwt;

//     if (token) {
//         jwt.verify(token, "random secret", (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect("/login");
//             } else {
//                 console.log(decodedToken);
//                 console.log("TESTING");
//                 next();
//             }
//         });
//     } else {
//         res.redirect("/login");
//     }
// };

export const deleteCookie = (req, res) => {
    req.session = null;
    res.redirect("/");
};
