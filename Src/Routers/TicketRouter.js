import { Router } from "express";

const ticketRouter = Router();

ticketRouter.get("/get/:ticketID", async (req, res, next) => {});

ticketRouter.post("/update/:ticketID", async (req, res, next) => {});

ticketRouter.post("/close/:ticketID", async (req, res, next) => {});

ticketRouter.post("/create/:ticketID", async (req, res, next) => {});

export { ticketRouter };
