import { Router } from "express";
import Controller from "../Controllers/index.js";

const ticketRouter = Router();

ticketRouter.get("/get/:ticketID", Controller.ticket.get);

ticketRouter.post("/update/:ticketID", Controller.ticket.update);

ticketRouter.post("/close/:ticketID", Controller.ticket.close);

ticketRouter.post("/create", Controller.ticket.create);

export { ticketRouter };
