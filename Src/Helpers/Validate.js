const Validate = {};

Validate.loginBody = (body) => {
  if (!body.username) return false;
  if (!body.password) return false;
  const regex = /^[a-f0-9]{32}$/gi;
  if (!regex.test(body.password)) return false;
  if (!isNaN(body.username)) return false;
  return true;
};

Validate.checkBody = (body) => {
  if (!body.token) return false;
  if (!isNaN(body.token)) return false;
  return true;
};

export default Validate;
