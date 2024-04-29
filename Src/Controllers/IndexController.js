import * as Tools from "../Helpers/index.js";
import { request, response } from "express";
import Events from "../Events/index.js";

const Controller = {};
const EventsHandler = {};

/**
 *
 * @param {response} res
 * @param {String} lang
 */
EventsHandler.user = (res, lang) => {
  const UserEvents = new Events.User.Class(res, lang);
  Events.User.Controller.addeConnection(UserEvents);
  res.on("close", () => {
    Events.User.Controller.removeConnection(UserEvents);
    res.end();
  });
};

/**
 *
 * @param {response} res
 * @param {String} lang
 */
EventsHandler.ticket = (res, lang) => {
  const TicketEvents = new Events.Ticket.Class(res, lang);
  Events.Ticket.Controller.addeConnection(TicketEvents);
  res.on("close", () => {
    Events.Ticket.Controller.removeConnection(TicketEvents);
    res.end();
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.default = async (req, res) => {
  return res.status(200).send("Default Page");
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.getVersion = async (req, res) => {
  return res.status(200).send({ version: Tools.Version.getVersion() });
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.events = (req, res) => {
  const query = req.query;
  const lang = query.lang || "default";
  const type = query.type;
  if (!Events.Types.includes(type))
    return Tools.Response.defaultErrorMessage(res, lang);
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  if (type == "user") EventsHandler.user(res, lang);
  else if (type == "ticket") EventsHandler.ticket(res, lang);
  else Tools.Response.defaultErrorMessage(res, lang);
};

export default Controller;
