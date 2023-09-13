import express from "express";
const urlsRouter = express.Router();

import { renderUrls, newUrls, singleUrl } from "../controllers/urls.js";

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");

urlsRouter.get("/new", newUrls);
// console.log("editUrls works");

urlsRouter.get("/:id", singleUrl);
console.log("singleUrl works");

export default urlsRouter;
