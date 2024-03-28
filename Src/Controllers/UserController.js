import * as Tools from "../Helpers/index.js";
import { Controllers, Models } from "../Models/index.js";

const Controller = {};

Controller.get = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
};

Controller.update = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
};

Controller.delete = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
};

Controller.disable = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
};

Controller.enable = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
};

Controller.changePassword = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
};

Controller.create = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!body.token) return Tools.Response.unauthorized(res, language);
  let user = await Controllers.user.getuserByToken();
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
