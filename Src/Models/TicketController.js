import { ticketModel } from "./TicketModel.js";
import { Ticket, Message } from "../Helpers/index.js";
import { v4 as uuidv4 } from "uuid";

const Controller = {};

/**
 *
 * @param {Ticket} ticket
 * @returns {Promise<Boolean}
 */
Controller.createTicket = async (ticket) => {
  let ticketID = uuidv4();
  return await ticketModel
    .create({
      created: ticket.created,
      title: ticket.title,
      description: ticket.description,
      messages: ticket.messagesJson(),
      ownerID: ticket.ownerID,
      resolved: ticket.resolved,
      urgent: ticket.urgent,
      ticketID: ticketID,
      problem: ticket.problem,
      department: ticket.department,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

/**
 *
 * @param {Message} message
 * @param {String} ticketID
 * @returns {Promise<Boolean}
 */
Controller.addMessage = async (message, ticketID) => {
  let ticket = await ticketModel.findOne({ ticketID: ticketID });
  if (ticket) {
    ticket.messages.push(message.covnertToJson());
    await ticket.save();
    return true;
  } else {
    return false;
  }
};

/**
 *
 * @param {String} ticketID
 * @returns {Promise<Ticket>}
 */
Controller.getTicket = async (ticketID) => {
  let ticket = await ticketModel.findOne({ ticketID: ticketID });
  if (!ticket) return null;
  let t = new Ticket(
    ticket.ownerID,
    ticket.title,
    ticket.description,
    [],
    ticket.ticketID,
    ticket.urgent,
    ticket.resolved,
    ticket.created,
    ticket.problem,
    ticket.department
  );
  for (let i = 0; i < ticket.messages.length; i++) {
    t.addMessage(
      ticket.messages[i].fullName,
      ticket.messages[i].message,
      ticket.messages[i].type,
      ticket.messages[i].ownerID
    );
  }
  return t;
};

/**
 *
 * @returns {Promise<Array<Ticket>>}
 */
Controller.getAllTickets = async () => {
  let tickets = await ticketModel.find();
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.title,
      ticket.description,
      [],
      ticket.ticketID,
      ticket.urgent,
      ticket.resolved,
      ticket.created,
      ticket.problem,
      ticket.department
    );
    for (let i = 0; i < ticket.messages.length; i++) {
      t.addMessage(
        ticket.messages[i].fullName,
        ticket.messages[i].message,
        ticket.messages[i].type,
        ticket.messages[i].ownerID
      );
    }
    ret.push(t);
  });
  return ret;
};

/**
 *
 * @param {String} userID
 * @returns {Promise<Array<Ticket>>}
 */
Controller.getAllTicketsFromUser = async (userID) => {
  let tickets = await ticketModel.find({ ownerID: userID });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.title,
      ticket.description,
      [],
      ticket.ticketID,
      ticket.urgent,
      ticket.resolved,
      ticket.created,
      ticket.problem,
      ticket.department
    );
    for (let i = 0; i < ticket.messages.length; i++) {
      t.addMessage(
        ticket.messages[i].fullName,
        ticket.messages[i].message,
        ticket.messages[i].type,
        ticket.messages[i].ownerID
      );
    }
    ret.push(t);
  });
  return ret;
};

/**
 *
 * @param {Boolean} isUser
 * @param {String} userID
 * @returns {Promise<Array<Ticket>>}
 */
Controller.getUrgentTickets = async (isUser = false, userID = "") => {
  let tickets = isUser
    ? await ticketModel.find({ ownerID: userID, urgent: true, resolved: false })
    : await ticketModel.find({ urgent: true, resolved: false });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.title,
      ticket.description,
      [],
      ticket.ticketID,
      ticket.urgent,
      ticket.resolved,
      ticket.created,
      ticket.problem,
      ticket.department
    );
    for (let i = 0; i < ticket.messages.length; i++) {
      t.addMessage(
        ticket.messages[i].fullName,
        ticket.messages[i].message,
        ticket.messages[i].type,
        ticket.messages[i].ownerID
      );
    }
    ret.push(t);
  });
  return ret;
};

/**
 *
 * @param {Boolean} isUser
 * @param {String} userID
 * @returns {Promise<Array<Ticket>>}
 */
Controller.getClosedTickets = async (isUser = false, userID = "") => {
  let tickets = isUser
    ? await ticketModel.find({ ownerID: userID, resolved: true })
    : await ticketModel.find({ resolved: true });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.title,
      ticket.description,
      [],
      ticket.ticketID,
      ticket.urgent,
      ticket.resolved,
      ticket.created,
      ticket.problem,
      ticket.department
    );
    for (let i = 0; i < ticket.messages.length; i++) {
      t.addMessage(
        ticket.messages[i].fullName,
        ticket.messages[i].message,
        ticket.messages[i].type,
        ticket.messages[i].ownerID
      );
    }
    ret.push(t);
  });
  return ret;
};

/**
 *
 * @param {Boolean} isUser
 * @param {String} userID
 * @returns {Promise<Array<Ticket>>}
 */
Controller.getNewTickets = async (isUser = false, userID = "") => {
  let all = isUser
    ? await ticketModel.find({ ownerID: userID, resolved: false })
    : await ticketModel.find({ resolved: false });
  let tickets = [];
  all.forEach((a) => {
    let created = new Date(a.created);
    let now = new Date(Date.now());
    let timeDiff = Math.abs(created.getTime() - now.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 7) tickets.push(a);
  });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.title,
      ticket.description,
      [],
      ticket.ticketID,
      ticket.urgent,
      ticket.resolved,
      ticket.created,
      ticket.problem,
      ticket.department
    );
    for (let i = 0; i < ticket.messages.length; i++) {
      t.addMessage(
        ticket.messages[i].fullName,
        ticket.messages[i].message,
        ticket.messages[i].type,
        ticket.messages[i].ownerID
      );
    }
    ret.push(t);
  });
  return ret;
};

/**
 *
 * @param {Boolean} isUser
 * @param {String} userID
 * @returns {Promise<Array<Ticket>>}
 */
Controller.getOldTickets = async (isUser = false, userID = "") => {
  let all = isUser
    ? await ticketModel.find({ ownerID: userID, resolved: false })
    : await ticketModel.find({ resolved: false });
  let tickets = [];
  all.forEach((a) => {
    let created = new Date(a.created);
    let now = new Date(Date.now());
    let timeDiff = Math.abs(created.getTime() - now.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 7) tickets.push(a);
  });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.title,
      ticket.description,
      [],
      ticket.ticketID,
      ticket.urgent,
      ticket.resolved,
      ticket.created,
      ticket.problem,
      ticket.department
    );
    for (let i = 0; i < ticket.messages.length; i++) {
      t.addMessage(
        ticket.messages[i].fullName,
        ticket.messages[i].message,
        ticket.messages[i].type,
        ticket.messages[i].ownerID
      );
    }
    ret.push(t);
  });
  return ret;
};

/**
 *
 * @param {String} ticketID
 * @returns {Promise<Boolean}
 */
Controller.closeTicket = async (ticketID) => {
  let ticket = await ticketModel.findOne({ ticketID: ticketID });
  if (!ticket) return false;
  ticket.resolved = true;
  await ticket.save();
  return true;
};

/**
 *
 * @param {String} ticketID
 * @returns {Promise<Boolean}
 */
Controller.setUrgent = async (ticketID) => {
  let ticket = await ticketModel.findOne({ ticketID: ticketID });
  if (!ticket) return false;
  ticket.urgent = true;
  await ticket.save();
  return true;
};

/**
 *
 * @param {String} ticketID
 * @returns {Promise<Boolean}
 */
Controller.deleteTicket = async (ticketID) => {
  await ticketModel.findOneAndDelete({ ticketID: ticketID });
  return true;
};

export default Controller;
