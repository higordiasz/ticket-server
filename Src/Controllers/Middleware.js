import * as Tools from "../Helpers/index.js";
import * as DB from "../Models/index.js";
import { request, response } from "express";

const Middleware = {};
/**
 *
 * @param {request} req
 * @param {response} res
 */
Middleware.authentication = async (req, res, next) => {
  let token = req.headers.authorization || "";
  let language = req.query.lang || "default";
  console.log(req.headers);
  console.log("Token: " + token);
  if (token == "") return Tools.Response.unauthorized(res, language);
  let user = await DB.Controllers.user.getuserByToken(token);
  if (!user) return Tools.Response.unauthorized(res, language);
  req.user = user;
  next();
};

export default Middleware;
