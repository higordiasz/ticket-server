import * as Tools from "../Helpers/index.js";
import * as Models from "../Models/index.js";
import { response } from "express";

const Response = {};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.unauthorized = (res, language = "default") => {
  return res.status(401).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("UNAUTHORIZED_ACCESS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.loginFailed = (res, language = "default") => {
  return res.status(401).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("LOGIN_FAILED", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.loginSuccess = (res, token, language = "default") => {
  return res.status(200).send({
    error: false,
    data: { token: token },
    message: Tools.Language.getMessage("LOGIN_SUCCESS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.checkFailed = (res, language = "default") => {
  return res.status(401).send({
    error: true,
    data: { check: false },
    message: Tools.Language.getMessage("CHECK_FAILED", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.checkSuccess = (res, language = "default") => {
  return res.status(200).send({
    error: false,
    data: { check: true },
    message: Tools.Language.getMessage("CHECK_SUCCESS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.missingRequiredFields = (res, language = "default") => {
  return res.status(400).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("MISSING_FIELDS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.emailExist = (res, language = "default") => {
  return res.status(400).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("EMAIL_EXIST", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.usernameExist = (res, language = "default") => {
  return res.status(400).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("USERNAME_EXIST", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.userNotCreated = (res, language = "default") => {
  return res.status(201).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("USER_NOT_CREATED", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.userCreated = (res, language = "default") => {
  return res.status(400).send({
    error: false,
    data: {},
    message: Tools.Language.getMessage("USER_CREATED", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.defaultErrorMessage = (res, language = "default") => {
  return res.status(400).send({
    error: false,
    data: {},
    message: Tools.Language.getMessage("DEFAULT_ERROR", language),
  });
};

/**
 *
 * @param {response} res
 * @param {Object} user
 * @param {String} language
 */
Response.sendUser = (res, user, language = "default") => {
  return res.status(200).send({
    error: false,
    data: Models.Controllers.user.userToJson(user),
    message: Tools.Language.getMessage("DEFAULT_SUCCESS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {String} language
 */
Response.defaultSuccessMessage = (res, language = "default") => {
  return res.status(200).send({
    error: false,
    data: {},
    message: Tools.Language.getMessage("DEFAULT_SUCCESS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {Object} ticket
 * @param {String} language
 */
Response.sendTicket = (res, ticket, language = "default") => {
  return res.status(200).send({
    error: false,
    data: { ticket: ticket },
    message: Tools.Language.getMessage("DEFAULT_SUCCESS", language),
  });
};

/**
 *
 * @param {response} res
 * @param {Array<Object>} tickets
 * @param {String} language
 */
Response.sendTickets = (res, tickets, language = "default") => {
  return res.status(200).send({
    error: false,
    data: { tickets: tickets },
    message: Tools.Language.getMessage("DEFAULT_SUCCESS", language),
  });
};

Response.ticketNotFound = (res, language = "default") => {
  return res.status(400).send({
    error: false,
    data: { tickets: tickets },
    message: Tools.Language.getMessage("TICKET_NOT_FOUND", language),
  });
};

export default Response;
