import { getAllUsers } from "../helpers/users.js";
import { writeDataToFile } from "../utils/updateDB.js";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';


export const renderRegister = (req, res) => {

    res.render("register");
    // const users = getAllUsers()
    // res.send(users)

};

const saltRounds = 12;

export const newUser = (req, res) => {


    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let id = uuidv4()

    const newUser = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        password: hash
    }



    writeDataToFile("./models/users.json", newUser)
        .then(res.redirect("/"))
        .catch((e) => console.log(e, "e"))



}


