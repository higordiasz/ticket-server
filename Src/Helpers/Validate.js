import * as Tools from "./index.js";

const Validate = {};

/**
 *
 * @param {Object} body
 * @returns {Boolean}
 */
Validate.loginBody = (body) => {
  if (!body.username) return false;
  if (!body.password) return false;
  const regex = /^[a-f0-9]{32}$/gi;
  if (!regex.test(body.password)) return false;
  if (!isNaN(body.username)) return false;
  return true;
};

/**
 *
 * @param {Object} body
 * @returns {Boolean}
 */
Validate.checkBody = (body) => {
  if (!body.token) return false;
  if (!isNaN(body.token)) return false;
  return true;
};

/**
 *
 * @param {Object} body
 * @returns {Boolean}
 */
Validate.createTicketBody = (body) => {
  if (!body.title) return false;
  if (!body.description) return false;
  if (!isNaN(body.title)) return false;
  if (!isNaN(body.description)) return false;
  return true;
};

Validate.messageTicketBody = (body) => {
  if (!body.message) return false;
  if (!isNaN(body.message)) return false;
  if (!body.type) return false;
  if (isNaN(body.type)) return false;
  return true;
};

/**
 *
 * @param {Object} body
 * @returns {Boolean}
 */
Validate.validateCreationBody = (body) => {
  if (!body.username) return false;
  if (!isNaN(body.username)) return false;
  if (body.username.length < Tools.Config.minUsernameLenght) return false;
  if (body.username.length > Tools.Config.maxUsernameLenght) return false;

  if (!body.password) return false;
  if (!isNaN(body.password)) return false;
  if (body.password.length < Tools.Config.minPasswordLength) return false;
  if (body.password.length > Tools.Config.maxPasswordLength) return false;

  if (!body.name) return false;
  if (!isNaN(body.name)) return false;
  if (body.name.length < 2) return false;

  if (!body.email) return false;
  if (!isNaN(body.email)) return false;
  if (body.email.length < 2) return false;

  if (!body.type) return false;
  if (!isNaN(body.type)) return false;
  if (body.type.length < 1) return false;

  if (!body.company) return false;
  if (!isNaN(body.company)) return false;
  if (body.company.length < 1) return false;

  if (!body.departments) return false;
  if (!Array.isArray(body.departments)) return false;
  if (body.departments.length < 1) return false;

  if (!Tools.Companies.validateDepartments(body.company, body.departments))
    return false;
  return true;
};

export default Validate;
