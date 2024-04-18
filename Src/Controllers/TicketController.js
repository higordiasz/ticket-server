import { request, response } from "express";
import * as Tools from "../Helpers/index.js";
import * as DB from "../Models/index.js";

const Controller = {};
const Private = {};

Private.getAlluserTicket = async (userID, status) => {
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
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.get = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let ticketID = req.params.ticketID;
  let user = req.user;
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
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let status = query.status || "new";
  let type = query.type || "user";
  let user = req.user;
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.update = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let ticketID = req.params.ticketID;
  let user = req.user;
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.close = async (req, res) => {
  let body = req.body;
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
