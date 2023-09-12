// urls functions

export const renderUrls = (req, res) => {
    res.render("urls");
};

export const editUrls = (req, res) => {
    res.render("singleUrl");
};

// conditionally rendering, shouldn't show Login & Register
// add a button to create newUrl ( route to newUrl)
