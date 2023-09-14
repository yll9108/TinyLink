import { getAllUsers, validate } from "../helpers/users.js";
import { writeDataToFile, reading } from "../utils/updateDB.js";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

const dbPath = "./models/users.json";

export const renderRegister = (req, res) => {

    res.render("register", { error: false, message: "" });
    // const users = getAllUsers()
    // res.send(users)

};







export const newUser = (req, res) => {

    if (req.body.name === " " || req.body.email === " " || req.body.password === "") {
        res.render("register", { error: true, message: "Please fill out all the fields." })
    } else {
        const db = reading(dbPath)
        if (validate(req.body.email, db)) {
            res.render("register", { error: true, message: "User already registered" })
        } else {

            const saltRounds = 12;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            let id = uuidv4()
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


