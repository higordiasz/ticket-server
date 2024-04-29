import UserEvents from "./UserEventsClass.js";
const Connections = [];
const Controller = {};

/**
 *
 * @param {UserEvents} userEvents
 */
Controller.addeConnection = (userEvents) => {
  Connections.push(userEvents);
};

/**
 *
 * @param {UserEvents} userEvents
 */
Controller.removeConnection = (userEvents) => {
  let index = Connections.indexOf(userEvents);
  if (index > -1) Connections.splice(index, 1);
};

/**
 *
 * @param {String} username
 * @param {String} fullName
 * @param {String} creator
 */
Controller.userCreated = (username, fullName, creator) => {
  try {
    Connections.forEach((con) => {
      con.res.write(
        `data: ${JSON.stringify({ username, fullName, creator })}\n\n`
      );
    });
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};

Controller.userLoggedIn = async (username, fullName) => {
  try {
    Connections.forEach((con) => {
      con.res.write(`data: ${JSON.stringify({ username, fullName })}\n\n`);
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export default Controller;
