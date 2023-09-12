import express from "express";
const urlsRouter = express.Router();

import { renderUrls } from "../controllers/urls.js";

urlsRouter.get("/", renderUrls);
// console.log("urlsRouter works");
export default urlsRouter;
