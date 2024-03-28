import { model } from "mongoose";
import * as Tools from "../Helpers/index.js";
import { Models } from "./index.js";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";

const Controller = {};
const Private = {};

Private.checkEmail = (email) => {
  if (Models.user.findOne({ email: email }) != null) return false;
  return true;
};

Private.checkUsername = (username) => {
  if (Models.user.findOne({ username: username }) != null) return false;
  return true;
};

Controller.validateCreationBody = (body) => {
  if (!body.username) return false;
  if (!isNaN(body.username)) return false;
  if (body.username.length < Tools.Config.minUsernameLenght) return false;
  if (body.username.length > Tools.Config.maxUsernameLenght) return false;

  if (!body.paswword) return false;
  if (!isNaN(body.paswword)) return false;
  if (body.paswword.length < Tools.Config.minPasswordLength) return false;
  if (body.paswword.length > Tools.Config.maxPasswordLength) return false;

  if (!body.name) return false;
  if (!isNaN(body.name)) return false;
  if (body.name.length > 1) return false;

  if (!body.email) return false;
  if (!isNaN(body.email)) return false;
  if (body.email.length > 1) return false;

  if (!body.type) return false;
  if (!isNaN(body.type)) return false;
  if (body.type.length > 1) return false;

  if (!body.company) return false;
  if (!isNaN(body.company)) return false;
  if (body.company.length > 0) return false;

  if (!body.departments) return false;
  if (!Array.isArray(body.departments)) return false;
  if (body.departments.length > 0) return false;

  if (!Tools.Companies.validateDepartments(body.company, body.departments))
    return false;

  return true;
};

Controller.getuserByToken = async (token) => {
  let user = Models.user.findOne({ token: token });
  if (!user) return null;
  return user;
};

Controller.createUser = async (body, language = "default") => {
  let ret = new Tools.Return();
  if (!Private.checkEmail(body.email)) {
    ret.code = 2;
    ret.error = true;
    ret.message = "";
    ret.data = null;
    return ret;
  }
  if (!Private.checkUsername(body.username)) {
    ret.code = 3;
    ret.error = true;
    ret.message = "";
    ret.data = null;
    return ret;
  }
  let userID = uuidv4();
  let created = Date.now();
  let password = md5(body.password);
  let create = Models.user
    .create({
      accountType: body.type,
      company: body.company,
      created: created,
      departments: body.departments,
      email: body.email,
      fullName: body.name,
      password: password,
      token: Tools.Token.generateToken(body.username, body.email),
      userID: userID,
      username: body.username,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  if (create) {
    ret.error = false;
    ret.message = "";
    ret.code = 1;
    ret.data = null;
    return ret;
  }
  ret.error = false;
  ret.message = "";
  ret.code = 4;
  ret.data = null;
  return ret;
};

export default Controller;
