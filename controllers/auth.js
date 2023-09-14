import { getAllUsers } from "../helpers/users.js";
import { writeDataToFile, reading } from "../utils/updateDB.js";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

const dbPath = "./models/users.json";

export const renderRegister = (req, res) => {

    res.render("register");
    // const users = getAllUsers()
    // res.send(users)

};


const validate = (email, db) => {
    let found = false;
    db.users.find((user) => {
        if (email === user.email) {
            found = true
        }
    })
    return found
}




export const newUser = (req, res) => {

    if (req.body.name === " " || req.body.email === " " || req.body.password === "") {
        res.send("Please fill out the fields")
    }

    console.log("req", req.body)

    const db = reading(dbPath)
    if (validate(req.body.email, db)) {
        res.send("Error")
    } else {
        try {
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
        } catch (error) {
            throw new Error()
        }
    }
}


