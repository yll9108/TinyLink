// urls functions

export const renderUrls = (req, res) => {
    res.render("urls");
};

export const newUrls = (req, res) => {
    res.render("newUrl");
};

// export const idUrls = (req, res) => {
//     res.render("newUrl");
// };

// conditionally rendering, shouldn't show Login & Register
// add a button to create newUrl ( route to newUrl)
