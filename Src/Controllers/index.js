import indexController from "./IndexController.js";
import loginController from "./LoginController.js";
import ticketController from "./TicketController.js";
import userController from "./UserController.js";

const Controllers = {};

Controllers.index = indexController;
Controllers.login = loginController;
Controllers.ticket = ticketController;
Controllers.user = userController;

export default Controllers;
