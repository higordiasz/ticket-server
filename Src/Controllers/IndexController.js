import * as Tools from "../Helpers/index.js";
import { request, response } from "express";

const Controller = {};

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

export default Controller;
