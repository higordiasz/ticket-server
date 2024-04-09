import { Router } from "express";
import Controller from "../Controllers/index.js";

const userRouter = Router();

userRouter.get("/get/:userID", Controller.user.get);

userRouter.post("/update/:userID", Controller.user.update);

userRouter.post("/disable/:userID", Controller.user.disable);

userRouter.post("/enable/:userID", Controller.user.enable);

userRouter.post("/password/:userID", Controller.user.changePassword);

userRouter.post("/create", Controller.user.create);

export { userRouter };
