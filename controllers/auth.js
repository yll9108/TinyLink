import { getAllUsers, validate } from "../helpers/users.js";
import { writeDataToFile, reading } from "../utils/updateDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const dbPath = "./models/users.json";

export const renderLogin = (req, res) => {
    res.render("login");
};


export const renderRegister = (req, res) => {
    res.render("register");
    // const users = getAllUsers()
    // res.send(users)
};








export const newUser = (req, res) => {

    if (req.body.name === " " || req.body.email === " " || req.body.password === "") {
        res.render("register", { error: true, message: "Please fill out all the fields." })

    console.log("req", req.body);

    const db = reading(dbPath);
    if (validate(req.body.email, db)) {
        res.send("Error");
    } else {
        const db = reading(dbPath)
        if (validate(req.body.email, db)) {
            res.render("register", { error: true, message: "User already registered" })
        } else {

            const saltRounds = 12;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            let id = uuidv4();
            const newUser = {
                id: id,
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            writeDataToFile(dbPath, newUser)
            res.redirect("/")

        }
    }



}

export const checkACandSetCookie = (req, res) => {
    // const __dirname = path.resolve();
    // const userDataPath = path.join(__dirname, dbPath);
    const users = getAllUsers();
    const { email, password } = req.body;
    // const userArray = Object.values(users);
    // console.log("userArray", userArray);
    const user = users.users.find((user) => user.email === email);
    console.log("user", user);
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = user;
                res.redirect("/urls");
            } else {
                res.status(401).send("Invaild email or password");
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
