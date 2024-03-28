import * as Tools from "../Helpers/index.js";

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

export default Response;
