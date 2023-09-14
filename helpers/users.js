import fs from "fs";

const usersPath = './models/users.json';

const readUsers = () => {
    const usersData = fs.readFileSync(usersPath);
    return JSON.parse(usersData);
};

export const getAllUsers = (req, res) => {
    const users = readUsers();
    return users
};

