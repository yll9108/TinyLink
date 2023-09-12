import express from "express";
const urlsRouter = express.Router();

urlsRouter.get("/", (req, res) => {
    // console.log("urlsRouter works");
    res.render("urls");
});
export default urlsRouter;
