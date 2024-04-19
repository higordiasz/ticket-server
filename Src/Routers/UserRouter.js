import { Router } from "express";
import Controller from "../Controllers/index.js";

const userRouter = Router();

userRouter.get(
  "/get/:userID",
  Controller.middleware.authentication,
  Controller.user.get
);

userRouter.post(
  "/disable/:userID",
  Controller.middleware.authentication,
  Controller.user.disable
);

userRouter.post(
  "/enable/:userID",
  Controller.middleware.authentication,
  Controller.user.enable
);

userRouter.post(
  "/password/:userID",
  Controller.middleware.authentication,
  Controller.user.changePassword
);

userRouter.post(
  "/create",
  Controller.middleware.authentication,
  Controller.user.create
);

export { userRouter };
