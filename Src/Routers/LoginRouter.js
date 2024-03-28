import { Router } from "express";
import Controller from "../Controllers/index.js";

const loginRouter = Router();

loginRouter.post("/", Controller.login.login);

loginRouter.post("/check", Controller.login.login);

export { loginRouter };
