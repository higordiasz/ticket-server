import { request, response } from "express";
import { Ticket, Message } from "../Helpers/Ticket.js";
import * as Tools from "../Helpers/index.js";
import * as DB from "../Models/index.js";

const Controller = {};
const Private = {};

/**
 *
 * @param {String} userID
 * @param {String} status
 * @returns {Promise<Array<Ticket>>}
 */
Private.getAllUserTicket = async (userID, status) => {
  let tickets;
  switch (status) {
    case "new":
      tickets = await DB.Controllers.ticket.getNewTickets(true, userID);
      break;
    case "old":
      tickets = await DB.Controllers.ticket.getOldTickets(true, userID);
      break;
    case "urgent":
      tickets = await DB.Controllers.ticket.getUrgentTickets(true, userID);
      break;
    case "close":
      tickets = await DB.Controllers.ticket.getClosedTickets(true, userID);
      break;
    default:
      tickets = await DB.Controllers.ticket.getAllTicketsFromUser(userID);
      break;
  }
  return tickets;
};

/**
 *
 * @param {String} userID
 * @param {String} status
 * @returns {Promise<Array<Ticket>>}
 */
Private.getAllTicket = async (status) => {
  let tickets;
  switch (status) {
    case "new":
      tickets = await DB.Controllers.ticket.getNewTickets();
      break;
    case "old":
      tickets = await DB.Controllers.ticket.getOldTickets();
      break;
    case "urgent":
      tickets = await DB.Controllers.ticket.getUrgentTickets();
      break;
    case "close":
      tickets = await DB.Controllers.ticket.getClosedTickets();
      break;
    default:
      tickets = await DB.Controllers.ticket.getAllTickets();
      break;
  }
  return tickets;
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.get = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  let ticketID = req.params.ticketID;
  let ticket = await DB.Controllers.ticket.getTicket(ticketID);
  if (!ticket) return Tools.Response.defaultErrorMessage(res, language);
  return Tools.Response.sendTicket(res, ticket.covnertToJson(), language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.getAll = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  let status = query.status || "new";
  let type = query.type || "user";
  let user = req.user;
  let tickets;
  switch (type) {
    case "user":
      tickets = await Private.getAllUserTicket(user.userID, status);
      break;
    case "all":
      tickets = await Private.getAllTicket(status);
      break;
    default:
      tickets = null;
  }
  if (!tickets) return Tools.Response.missingRequiredFields(res, language);
  return Tools.Response.sendTickets(res, Ticket.arrayToJson(tickets), language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.setUrgent = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  let ticketID = req.params.ticketID;
  let user = req.user;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.administrator,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!(await DB.Controllers.ticket.setUrgent(ticketID)))
    return Tools.Response.ticketNotFound(res, language);
  return Tools.Response.defaultSuccessMessage(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.close = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  let ticketID = req.params.ticketID;
  let user = req.user;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.Ticket.close,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!(await DB.Controllers.ticket.closeTicket(ticketID)))
    return Tools.Response.ticketNotFound(res, language);
  return Tools.Response.defaultSuccessMessage(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.create = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let user = req.user;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.Ticket.create,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.addMessage = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let ticketID = req.params.ticketID;
  let user = req.user;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.Ticket.reply,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
};

export default Controller;
