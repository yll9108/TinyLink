// urls functions
import shortid from "shortid";
import { readingURL, writeDataToFileURL } from "../utils/updateDB.js";

export const renderUrls = (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Unauthorized");
    }

    const userId = req.session.user.id;
    const data = readingURL("models/urls.json");
    const userUrls = data.urls.filter((url) => url.userId === userId);

    res.render("urls", { urls: userUrls });
};

export const newUrls = (req, res) => {
    res.render("newUrl");
};

export const singleUrl = (req, res) => {
    res.render("singleUrl");
};

export const createUrl = (req, res) => {
    const { longUrl } = req.body;
    const updateUrl = longUrl;
    const shortUrlId = shortid.generate();

    if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Unauthorized");
    }
  
    let userId = req.session.user.id
    
    const data = readingURL("models/urls.json");

    const newUrl = {
        id: shortUrlId,
        longUrl,
        updateUrl,
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
    
    const data = readingURL("models/urls.json");
    const urlToEdit = data.urls.find((url) => url.id === urlIdToEdit);

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

    const data = readingURL("models/urls.json");
    const indexToEdit = data.urls.findIndex((url) => url.id === urlIdToEdit);

    if (indexToEdit === -1) {
        return res.status(404).send("URL not found");
    }

    if (data.urls[indexToEdit].userId !== userId) {
        return res.status(403).send("This URL does not belong to you");
    }

    data.urls[indexToEdit].updateUrl = req.body.updateUrl;

    // Update
    writeDataToFileURL("models/urls.json", data);

    // Redirect 
    res.redirect(`/urls`);
};


