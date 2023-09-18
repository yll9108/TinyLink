import express from "express";
const urlsRouter = express.Router();

import {
    renderUrls,
    newUrls,
    singleUrl,
    createUrl,
    deleteUrl,
} from "../controllers/urls.js";

import { ifAuth } from "../controllers/auth.js";

urlsRouter.get("/", ifAuth);

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");

urlsRouter.get("/new", newUrls);
// console.log("editUrls works");

urlsRouter.get("/:id", singleUrl);
// console.log("singleUrl works");

urlsRouter.post("/new", createUrl);
// console.log("createUrl works");

urlsRouter.post("/:id/delete", deleteUrl);
// console.log("deleteUrl works");

export default urlsRouter;
