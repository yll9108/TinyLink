import express from "express";
const urlsRouter = express.Router();

import {
    renderUrls,
    newUrls,
    singleUrl,
    createUrl,
    deleteUrl,
    renderSingleUrl,
    updateUrl,
} from "../controllers/urls.js";

import { ifAuth } from "../controllers/auth.js";

urlsRouter.get("/", ifAuth);
// urlsRouter.get("/new", ifAuth);

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");

urlsRouter.get("/new", ifAuth, newUrls);
// console.log("editUrls works");

urlsRouter.get("/:id", ifAuth, singleUrl);
// console.log("singleUrl works");

urlsRouter.post("/new", createUrl);
// console.log("createUrl works");

urlsRouter.post("/:id/delete", deleteUrl);
// console.log("deleteUrl works");

urlsRouter.post("/:id", renderSingleUrl);
// console.log("renderSingleUrl works");

urlsRouter.post("/:id/edit", updateUrl);
// console.log("updateUrl works");

export default urlsRouter;
