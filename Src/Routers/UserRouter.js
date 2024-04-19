import { Router } from "express";
import Controller from "../Controllers/index.js";

const userRouter = Router();

userRouter.get(
  "/get",
  Controller.middleware.authentication,
  Controller.user.get
);

userRouter.get(
  "/disable/:userID",
  Controller.middleware.authentication,
  Controller.user.disable
);

userRouter.get(
  "/enable/:userID",
  Controller.middleware.authentication,
  Controller.user.enable
);

userRouter.post(
  "/password",
  Controller.middleware.authentication,
  Controller.user.changePassword
);

userRouter.post(
  "/create",
  Controller.middleware.authentication,
  Controller.user.create
);

userRouter.post("/create/:token", Controller.user.createToken);

export { userRouter };
