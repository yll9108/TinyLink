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

    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Unauthorized");
    }
    
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

export const deleteUrl = (req, res) => {

    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Unauthorized");
    }

    const userId = req.session.user.id
    // console.log("userId",userId);
    const urlIdToDelete  = req.params.id;
    // console.log("urlIdToDelete",urlIdToDelete)
    const data = readingURL("models/urls.json");
    // console.log("data", data.urls[0].id);
    const indexToDelete = data.urls.findIndex((url) => url.id === urlIdToDelete);
    // console.log("indexToDelete",indexToDelete);

    if(indexToDelete === -1){
        return res.status(404).send("URL not found");
    }
    if(data.urls[indexToDelete].userId !== userId){
        return res.status(403).send("This url does not belong to you")
    }

    //delete url
    data.urls.splice(indexToDelete, 1);
    writeDataToFileURL("models/urls.json", data);

    // Redirect
    res.redirect("/urls");
}

export const renderSingleUrl = (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Unauthorized");
    }

    const userId = req.session.user.id;
    const urlIdToEdit = req.params.id;
    // console.log('userId',userId);
    // console.log('urlIdToEdit',urlIdToEdit);
    
    const data = readingURL("models/urls.json");
    const urlToEdit = data.urls.find((url) => url.id === urlIdToEdit);
    // const indexToEdit = data.urls.findIndex((url) => url.id === urlIdToEdit);
    console.log('urlToEdit',urlToEdit);

    if (!urlToEdit) {
        return res.status(404).send("URL not found");
      }
    
    if (urlToEdit.userId !== userId) {
        return res.status(403).send("This URL does not belong to you");
      }
    
    res.render("singleUrl", { urlToEdit }); 
};

export const updateUrl = (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Unauthorized");
    }

    const userId = req.session.user.id;
    const urlIdToEdit = req.params.id;
    // console.log('userId',userId);
    // console.log('urlIdToEdit',urlIdToEdit);

    const data = readingURL("models/urls.json");
    const indexToEdit = data.urls.findIndex((url) => url.id === urlIdToEdit);
    // console.log('indexToEdit',indexToEdit);

    if (indexToEdit === -1) {
        return res.status(404).send("URL not found");
    }

    if (data.urls[indexToEdit].userId !== userId) {
        return res.status(403).send("This URL does not belong to you");
    }

    // Update the longUrl with the new value from the form
    data.urls[indexToEdit].longUrl = req.body.updatedUrl;

    // Update
    writeDataToFileURL("models/urls.json", data);

    // Redirect 
    res.redirect(`/urls`);
};


