import { ticketModel } from "./TicketModel.js";
import { userModel } from "./UserModel.js";
import ticketController from "./TicketController.js";
import userController from "./UserController.js";

const Models = {};
const Controllers = {};

Models.user = userModel;
Models.ticket = ticketModel;

Controllers.user = userController;
Controllers.ticket = ticketController;

export { Models, Controllers };
