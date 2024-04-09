import * as Tools from "../Helpers/index.js";
import { Controllers, Models } from "../Models/index.js";

const Controller = {};

Controller.get = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken(body.token);
  return Tools.Response.sendUser(res, user);
};

Controller.update = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken(body.token);
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.update_user,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  let updateJson = {};
  if (body.name != null) updateJson.name = body.name;
  if (body.email != null) updateJson.email = body.email;
  if (body.username != null) updateJson.username = body.username;
  if (body.company != null) updateJson.company = body.company;
  if (body.departments != null) updateJson.departments = body.departments;
  let completed = await Controllers.user.updateUser(body.token, updateJson);
  if (completed) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

Controller.disable = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken(body.token);
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.administrator,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!body.userid) return Tools.Response.missingRequiredFields(res, language);
  let completed = await Controllers.user.disableUser(body.userid);
  if (completed) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

Controller.enable = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken(body.token);
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.administrator,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!body.userid) return Tools.Response.missingRequiredFields(res, language);
  let completed = await Controllers.user.enableUser(body.userid);
  if (completed) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

Controller.changePassword = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken(body.token);
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.change_password,
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

Controller.create = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken(body.token);
  if (
    !Tools.Permissions.havePermission(
      Tools.Permissions.List.user.create_user,
      user.accountType
    )
  )
    return Tools.Response.unauthorized(res, language);
  if (!Controllers.user.validateCreationBody(res, language))
    return Tools.Response.missingRequiredFields(res, language);
  let userCreate = await Controllers.user.createUser(body, language);
  switch (userCreate.code) {
    case 1:
      return Tools.Response.userCreated(res, language);
    case 2:
      return Tools.Response.emailExist(res, language);
    case 3:
      return Tools.Response.usernameExist(res.language);
    case 4:
      return Tools.Response.userNotCreated(res, language);
    default:
      return Tools.Response.defaultErrorMessage(res, language);
  }
};

export default Controller;
