import * as Tools from "../Helpers/index.js";

const Controller = {};

Controller.default = async (req, res) => {
  return res.status(200).send("Default Page");
};

Controller.getVersion = async (req, res) => {
  return res.status(200).send({ version: Tools.Version.getVersion() });
};

export default Controller;
