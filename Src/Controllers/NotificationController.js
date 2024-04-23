import * as Tools from "../Helpers/index.js";
import * as DB from "../Models/index.js";
import { request, response } from "express";

const Controller = {};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.getAllNotifications = async (req, res) => {
  const user = req.user;
  const language = req.query.lang || "default";
  const notifications = await DB.Controllers.notification.getAllNotification(
    user.userID
  );
  if (!notifications) return Tools.Response.defaultErrorMessage(res, language);
  return Tools.Response.sendnotifications(
    res,
    Tools.Notification.convertArrayToJson(notifications),
    language
  );
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.markAsReadNotification = async (req, res) => {
  const user = req.user;
  const notificationID = req.params.notificationID;
  const language = req.query.lang || "default";
  let asRead = await DB.Controllers.notification.markAsRead(
    notificationID,
    user.userID
  );
  if (asRead) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.removeNotification = async (req, res) => {
  const user = req.user;
  const notificationID = req.params.notificationID;
  const language = req.query.lang || "default";
  let removed = await DB.Controllers.notification.removeNotification(
    notificationID,
    user.userID
  );
  if (removed) return Tools.Response.defaultSuccessMessage(res, language);
  return Tools.Response.defaultErrorMessage(res, language);
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
Controller.createNotification = async (req, res) => {
  const user = req.user;
  const language = req.query.lang || "default";
  const body = req.body;
  const valid = Tools.Notification.checkFormat(body);
  if (!valid) return Tools.Response.missingRequiredFields(req, language);
};

export default Controller;
