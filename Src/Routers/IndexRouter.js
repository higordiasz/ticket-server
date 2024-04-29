import { Router } from "express";
import Controller from "../Controllers/index.js";

const indexRouter = Router();

indexRouter.all("/", Controller.index.default);

indexRouter.get("/version", Controller.index.getVersion);

indexRouter.get("/events", Controller.index.events);

export { indexRouter };
