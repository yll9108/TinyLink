import express from "express";
const urlsRouter = express.Router();

import { renderUrls } from "../controllers/urls.js";

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");

// urlsRouter.get("/new", singleUrls);
// console.log("editUrls works");

export default urlsRouter;
