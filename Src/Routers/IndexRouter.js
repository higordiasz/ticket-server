import { Router } from "express";

const indexRouter = Router();

indexRouter.all("/", (req, res, next) => {
  return res.status(200).send({ teste: "testado" });
});

export { indexRouter };
