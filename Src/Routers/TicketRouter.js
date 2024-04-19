import { Router } from "express";
import Controller from "../Controllers/index.js";

const ticketRouter = Router();

ticketRouter.get(
  "/get/:ticketID",
  Controller.middleware.authentication,
  Controller.ticket.get
);

ticketRouter.get(
  "/getall/:ticketID",
  Controller.middleware.authentication,
  Controller.ticket.getAll
);

ticketRouter.get(
  "/urgent/:ticketID",
  Controller.middleware.authentication,
  Controller.ticket.setUrgent
);

ticketRouter.get(
  "/close/:ticketID",
  Controller.middleware.authentication,
  Controller.ticket.close
);

ticketRouter.post(
  "/message/add/:ticketID",
  Controller.middleware.authentication,
  Controller.addMessage
);

ticketRouter.post(
  "/create",
  Controller.middleware.authentication,
  Controller.ticket.create
);

export { ticketRouter };
