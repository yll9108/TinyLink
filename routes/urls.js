import express from "express";
const urlsRouter = express.Router();

import { renderUrls, editUrls } from "../controllers/urls.js";

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");

urlsRouter.get("/new", editUrls);
console.log("editUrls works");

export default urlsRouter;
