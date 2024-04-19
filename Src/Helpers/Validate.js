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

export default Validate;
