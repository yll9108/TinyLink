// urls functions
import shortid  from "shortid";

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

    res.redirect("/urls");
};