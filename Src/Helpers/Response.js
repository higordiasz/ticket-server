import * as Tools from "../Helpers/index.js";
import * as Models from "../Models/index.js";

const Response = {};

Response.unauthorized = (res, language = "default") => {
  return res.status(401).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("UNAUTHORIZED_ACCESS", language),
  });
};

Response.missingRequiredFields = (res, language = "default") => {
  return res.status(400).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("MISSING_FIELDS", language),
  });
};

Response.emailExist = (res, language = "default") => {
  return res.status(400).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("EMAIL_EXIST", language),
  });
};

Response.usernameExist = (res, language = "default") => {
  return res.status(400).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("USERNAME_EXIST", language),
  });
};

Response.userNotCreated = (res, language = "default") => {
  return res.status(201).send({
    error: true,
    data: {},
    message: Tools.Language.getMessage("USER_NOT_CREATED", language),
  });
};

Response.userCreated = (res, language = "default") => {
  return res.status(400).send({
    error: false,
    data: {},
    message: Tools.Language.getMessage("USER_CREATED", language),
  });
};

Response.defaultErrorMessage = (res, language = "default") => {
  return res.status(400).send({
    error: false,
    data: {},
    message: Tools.Language.getMessage("DEFAULT_ERROR", language),
  });
};

Response.sendUser = (res, user, language = "default") => {
  return res.status(200).send({
    error: false,
    data: Models.Controllers.user.userToJson(user),
    message: Tools.Language.getMessage("DEFAULT_SUCCESS", language),
  });
};

Response.defaultSuccessMessage = (res, language = "default") => {
  return res.status(200).send({
    error: false,
    data: {},
    message: Tools.Language.getMessage("DEFAULT_SUCCESS", language),
  });
};

export default Response;
