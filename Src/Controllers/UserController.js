import * as Tools from "../Helpers/index.js";
import { Controllers, Models } from "../Models/index.js";
import { request, response } from "express";

const Controller = {};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.get = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  return Tools.Response.sendUser(res, req.user, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.disable = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  let user = req.user;
  let userID = req.params.userID;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.administrator,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!userID) return Tools.Response.missingRequiredFields(res, language);
  let completed = await Controllers.user.disableUser(userID);
  if (completed) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.enable = async (req, res) => {
  let query = req.query;
  let language = query.lang || "default";
  let user = req.user;
  let userID = req.params.userID;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.administrator,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!userID) return Tools.Response.missingRequiredFields(res, language);
  let completed = await Controllers.user.enableUser(userID);
  if (completed) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.changePassword = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let user = req.user;
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.administrator,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!body.newPassword)
    return Tools.Response.missingRequiredFields(res, language);
  if (!body.userid) return Tools.Response.missingRequiredFields(res, language);
  let change = await Controllers.user.changePassword(
    body.userid,
    body.newPassword
  );
  if (change) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
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
      Tools.Permissions.List.user.create_user,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!Tools.Validate.validateCreationBody(body))
    return Tools.Response.missingRequiredFields(res, language);
  let userCreate = await Controllers.user.createUser(body, language);
  switch (userCreate.code) {
    case 1:
      return Tools.Response.userCreated(res, language);
    case 2:
      return Tools.Response.emailExist(res, language);
    case 3:
      return Tools.Response.usernameExist(res, language);
    case 4:
      return Tools.Response.userNotCreated(res, language);
    default:
      return Tools.Response.defaultErrorMessage(res, language);
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.createToken = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  let token = req.params.token;
  let apiToken = process.env.APITOKEN;
  if (token != apiToken) return Tools.Response.unauthorized(req, language);
  if (!Tools.Validate.validateCreationBody(body))
    return Tools.Response.missingRequiredFields(res, language);
  let userCreate = await Controllers.user.createUser(body, language);
  switch (userCreate.code) {
    case 1:
      return Tools.Response.userCreated(res, language);
    case 2:
      return Tools.Response.emailExist(res, language);
    case 3:
      return Tools.Response.usernameExist(res, language);
    case 4:
      return Tools.Response.userNotCreated(res, language);
    default:
      return Tools.Response.defaultErrorMessage(res, language);
  }
};

export default Controller;
