import indexController from "./IndexController.js";
import loginController from "./LoginController.js";
import ticketController from "./TicketController.js";
import userController from "./UserController.js";
import notificationcontroller from "./NotificationController.js";
import Middleware from "./Middleware.js";

const Controllers = {};

Controllers.index = indexController;
Controllers.login = loginController;
Controllers.ticket = ticketController;
Controllers.user = userController;
Controllers.notification = notificationcontroller;
Controllers.middleware = Middleware;

export default Controllers;
