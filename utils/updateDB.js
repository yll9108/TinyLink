import fs from "fs"

export const writeDataToFile = (filename, content) => {

    let db = reading(filename)
    let newDB = { users: [] }
    newDB.users = db.users
    newDB.users.push(content)
    updating(filename, JSON.stringify(newDB))


};


export const reading = (filename) => {
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



