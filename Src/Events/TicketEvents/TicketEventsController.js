import TicketEvents from "./TicketEventsClass.js";
import * as Tools from "../../Helpers/index.js";
const Connections = [];
const Controller = {};

/**
 *
 * @param {TicketEvents} ticketEvents
 */
Controller.addeConnection = (ticketEvents) => {
  Connections.push(ticketEvents);
};

/**
 *
 * @param {TicketEvents} ticketEvents
 */
Controller.removeConnection = (ticketEvents) => {
  let index = Connections.indexOf(ticketEvents);
  if (index > -1) Connections.splice(index, 1);
};

/**
 *
 * @param {String} ticketID
 */
Controller.ticketCreated = (ticketID) => {
  try {
    Connections.forEach((con) => {
      con.res.write(
        `data: ${JSON.stringify({
          ticketID,
          message: Tools.Language.getMessage("NEW_TICKET_CREATE", con.lang),
          type: "create",
        })}`
      );
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

/**
 *
 * @param {String} ticketID
 */
Controller.ticketClosed = (ticketID) => {
  try {
    Connections.forEach((con) => {
      con.res.write(
        `data: ${JSON.stringify({
          ticketID,
          message: Tools.Language.getMessage("TICKET_MARKED_CLOSED", con.lang),
          type: "closed",
        })}`
      );
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

/**
 *
 * @param {String} ticketID
 */
Controller.ticketUrgent = (ticketID) => {
  try {
    Connections.forEach((con) => {
      con.res.write(
        `data: ${JSON.stringify({
          ticketID,
          message: Tools.Language.getMessage("TICKET_MARKED_URGENT", con.lang),
          type: "urgent",
        })}`
      );
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

/**
 *
 * @param {String} ticketID
 */
Controller.ticketNewMessage = (ticketID) => {
  try {
    Connections.forEach((con) => {
      con.res.write(
        `data: ${JSON.stringify({
          ticketID,
          message: Tools.Language.getMessage("TICKET_NEW_MESSAGE", con.lang),
          type: "message",
        })}`
      );
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export default Controller;
