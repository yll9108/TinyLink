import fs from "fs"

export const writeDataToFile = (filename, content) => {
    return new Promise(function (resolve, reject) {
        let db = reading(filename)
        if (validating(content.email, db)) {
            reject("User already registered")
        } else {
            let newDB = { users: [] }
            newDB.users = db.users
            newDB.users.push(content)
            updating(filename, JSON.stringify(newDB))
            resolve()
        }
    }).catch((error) => {
        console.log("error", error)
        return error
    })
};


const reading = (filename) => {
    let readedFile = fs.readFileSync(filename, (err, data) => {
        if (err) {
            console.log("error on read file", err);
        }
    });
    if (readedFile.toString().length === 0) {
        return { users: [] }
    } else {
        return JSON.parse(readedFile)
    }
}


const updating = (filename, finalJSON) => {
    fs.writeFileSync(filename, finalJSON, (err) => {
        if (err) {
            rejects(err)
        } else {
            console.log("DONE")
        }
    })
}

const validating = (email, db) => {
    let found = false;
    db.users.find((user) => {
        if (email === user.email) {
            found = true
        }
    })
    return found
}



