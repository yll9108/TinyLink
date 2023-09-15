// urls functions
import shortid  from "shortid";
import { writeDataToFile} from "../utils/updateDB";

export const renderUrls = (req, res) => {
    res.render("urls");
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
    console.log(`Shortened URL: ${shortUrlId}`);
    
    // Read existing data from the file
    const data = reading("models/urls.json");
    const newUrl = {
        longUrl,
        shortUrlId,
        userID
    };
    data.urls.push(newUrl);
    writeDataToFile("models/urls.json", data);
    // Redirect to /urls
    res.redirect("/urls");
};