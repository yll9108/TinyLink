import express from "express";
const urlsRouter = express.Router();

import { renderUrls, newUrls } from "../controllers/urls.js";

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");

urlsRouter.get("/new", newUrls);
// console.log("editUrls works");

// urlsRouter.get("/:id", idUrls);
// console.log("editUrls works");

export default urlsRouter;
