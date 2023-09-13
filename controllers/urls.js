// urls functions

export const renderUrls = (req, res) => {
    res.render("urls");
};

export const newUrls = (req, res) => {
    res.render("newUrl");
};

export const singleUrl = (req, res) => {
    res.render("singleUrl");
};
