import { ticketModel } from "./TicketModel.js";
import { userModel } from "./UserModel.js";
import ticketController from "./TicketController.js";
import userController from "./UserController.js";
import notificationModel from "./NotificationModel.js";
import notificationController from "./NotificationController.js";

const Models = {};
const Controllers = {};

Models.user = userModel;
Models.ticket = ticketModel;
Models.notification = notificationModel;

Controllers.user = userController;
Controllers.ticket = ticketController;
Controllers.notification = notificationController;

export { Models, Controllers };
