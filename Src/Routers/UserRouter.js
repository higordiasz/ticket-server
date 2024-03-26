import { Router } from "express";

const userRouter = Router();

userRouter.all("/", (req, res, next) => {});

userRouter.get("/get/:userID", async (req, res, next) => {});

userRouter.post("/update/:userID", async (req, res, next) => {});

userRouter.post("/delete/:userID", async (req, res, next) => {});

userRouter.post("/disable/:userID", async (req, res, next) => {});

userRouter.post("/enable/:userID", async (req, res, next) => {});

userRouter.post("/password/:userID", async (req, res, next) => {});

userRouter.post("/create", async (req, res, next) => {});

export { userRouter };
