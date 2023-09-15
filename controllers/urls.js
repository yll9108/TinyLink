// urls functions
import shortid from "shortid";
import { readingURL, writeDataToFileURL } from "../utils/updateDB.js";

export const renderUrls = (req, res) => {
    const data = readingURL("models/urls.json");
    res.render("urls", { urls: data.urls });
};

export const newUrls = (req, res) => {
    res.render("newUrl");
};

export const singleUrl = (req, res) => {
    res.render("singleUrl");
};

export const createUrl = (req, res) => {
    const { longUrl } = req.body;
    const shortUrlId = shortid.generate();
    // console.log(`Shortened URL: ${shortUrlId}`);

    let userId = req.session.user.id

    const data = readingURL("models/urls.json");

    const newUrl = {
        id: shortUrlId,
        longUrl,
        userId,
    };

    data.urls.push(newUrl);

    writeDataToFileURL("models/urls.json", data);

    // Redirect
    res.redirect("/urls");
};


