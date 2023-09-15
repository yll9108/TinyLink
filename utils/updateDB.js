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

export const writeDataToFileURL = (filename, content) => {
    try {
        const jsonData = JSON.stringify(content, null, 4);
        fs.writeFileSync(filename, jsonData);
        console.log("URL data file updated successfully.");
    } catch (err) {
        console.error("Error writing URL data file:", err);
    }
};

export const readingURL = (filename) => {
    let readedFile;
    try {
        readedFile = fs.readFileSync(filename, "utf-8");
    } catch (err) {
        console.log("Error reading file", err);
        readedFile = "";
    }

    if (readedFile.length === 0) {
        return { urls: [] }; 
    } else {
        return JSON.parse(readedFile);
    }
};

const updatingURL = (filename, finalJSON) => {
    try {
        fs.writeFileSync(filename, finalJSON);
        console.log("URL data file updated successfully.");
    } catch (err) {
        console.log("Error writing URL data file", err);
    }
};




