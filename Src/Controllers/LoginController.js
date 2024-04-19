import * as Tools from "../Helpers/index.js";
import * as DB from "../Models/index.js";
import { request, response } from "express";

const Controller = {};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.login = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  if (!Tools.Validate.loginBody(body))
    return Tools.Response.loginFailed(res, language);
  let user = await DB.Controllers.user.getUserByUsername(body.username);
  if (!user) return Tools.Response.loginFailed(res, language);
  if (!user.enable) return Tools.Response.userDisabled(res, language);
  if (user.password != body.password)
    return Tools.Response.loginFailed(res, language);
  let token = Tools.Token.generateToken(user.username, user.email);
  if (DB.Controllers.user.updateToken(user.userID, token))
    return Tools.Response.loginSuccess(res, token, language);
  else return Tools.Response.loginSuccess(res, user.token, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.check = async (req, res) => {
  let body = req.body;
  let query = req.query;
  let language = query.lang || "default";
  console.log(body.token);
  if (!Tools.Validate.checkBody(body))
    return Tools.Response.checkFailed(res, language);
  let user = await DB.Controllers.user.getuserByToken(body.token);
  if (!user) return Tools.Response.checkFailed(res, language);
  if (!user.enable) return Tools.Response.userDisabled(res, language);
  if (!user) return Tools.Response.checkFailed(res, language);
  return Tools.Response.checkSuccess(res, language);
};

export default Controller;
