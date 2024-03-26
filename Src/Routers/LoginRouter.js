import { Router } from "express";
import { nextTick } from "process";

const loginRouter = Router();

loginRouter.get("/", async (req, res, next) => {});

export { loginRouter };
