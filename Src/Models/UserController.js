import * as Tools from "../Helpers/index.js";
import { Models } from "./index.js";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";

const Controller = {};
const Private = {};

Private.checkEmail = async (email) => {
  if (!(await Models.user.findOne({ email: email }))) return true;
  return false;
};

Private.checkUsername = async (username) => {
  if (!(await Models.user.findOne({ username: username }))) return true;
  return false;
};

Private.getUserByUserID = async (userID) => {
  let user = await Models.user.findOne({ userID: userID });
  if (!user) return null;
  return user;
};

Private.getUserByToken = async (token) => {
  let user = await Models.user.findOne({ token: token });
  if (!user) return null;
  return user;
};

Controller.getUserByUsername = async (username) => {
  let user = Models.user.findOne({ username: username });
  if (!user) return null;
  return user;
};

Controller.getuserByToken = async (token) => {
  let user = await Models.user.findOne({ token: token });
  if (!user) return null;
  return user;
};

Controller.updateUser = async (token, updateFields) => {
  let user = await Private.getUserByToken(token);
  if (!user) return false;
  user.fullName = updateFields.name || user.fullName;
  user.email = updateFields.email || user.email;
  user.username = updateFields.username || user.username;
  user.company = updateFields.company || user.company;
  user.departments = updateFields.departments || user.departments;
  await user.save();
  return true;
};

Controller.createUser = async (body, language = "default") => {
  let ret = new Tools.Return();
  if (!(await Private.checkEmail(body.email))) {
    ret.code = 2;
    ret.error = true;
    ret.message = "";
    ret.data = null;
    return ret;
  }
  if (!(await Private.checkUsername(body.username))) {
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
      enable: true,
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

Controller.disableUser = async (userID) => {
  let user = await Private.getUserByUserID(userID);
  if (!user) return false;
  user.enable = false;
  await user.save();
  return true;
};

Controller.enableUser = async (userID) => {
  let user = await Private.getUserByUserID(userID);
  if (!user) return false;
  user.enable = true;
  await user.save();
  return true;
};

Controller.changePassword = async (userID, newPassword) => {
  let user = await Private.getUserByUserID(userID);
  if (!user) return false;
  if (!newPassword) return false;
  if (!isNaN(newPassword)) return false;
  if (newPassword.length < Tools.Config.minPasswordLength) return false;
  if (newPassword.length > Tools.Config.maxPasswordLength) return false;
  user.password = md5(newPassword);
  await user.save();
  return true;
};

Controller.updateToken = async (userID, token) => {
  let user = await Models.user.findOne({ userID: userID });
  if (!user) return false;
  user.token = token;
  await user.save();
  return true;
};

Controller.userToJson = (user) => {
  let json = {};
  json.userID = user.userID;
  json.accountType = user.accountType;
  json.username = user.username;
  json.email = user.email;
  json.name = user.fullName;
  json.company = user.company;
  json.departments = user.departments;
  return json;
};

export default Controller;
