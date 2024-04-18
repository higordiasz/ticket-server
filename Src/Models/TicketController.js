import { ticketModel } from "./TicketModel.js";
import { Ticket, Message } from "../Helpers/index.js";
import { v4 as uuidv4 } from "uuid";

const Controller = {};

/**
 *
 * @param {Ticket} ticket
 */
Controller.createTicket = async (ticket) => {
  let ticketID = uuidv4();
  return await ticketModel
    .create({
      created: ticket.created,
      description: ticket.description,
      messages: ticket.messagesJson(),
      ownerID: ticket.ownerID,
      resolved: ticket.resolved,
      urgent: ticket.urgent,
      ticketID: ticketID,
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
 */
Controller.getTicket = async (ticketID) => {
  let ticket = await ticketModel.findOne({ ticketID: ticketID });
  if (!ticket) return null;
  let t = new Ticket(
    ticket.ownerID,
    ticket.description,
    [],
    ticket.urgent,
    ticket.resolved,
    ticket.created
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

Controller.getAllTickets = async () => {
  let tickets = await ticketModel.find();
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.description,
      [],
      ticket.urgent,
      ticket.resolved,
      ticket.created
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
 */
Controller.getAllTicketsFromUser = async (userID) => {
  let tickets = await ticketModel.find({ ownerID: userID });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.description,
      [],
      ticket.urgent,
      ticket.resolved,
      ticket.created
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

Controller.getUrgentTickets = async () => {
  let tickets = await ticketModel.find({ urgent: true });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.description,
      [],
      ticket.urgent,
      ticket.resolved,
      ticket.created
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

Controller.getClosedTickets = async () => {
  let tickets = await ticketModel.find({ resolved: true });
  let ret = [];
  tickets.forEach((ticket) => {
    let t = new Ticket(
      ticket.ownerID,
      ticket.description,
      [],
      ticket.urgent,
      ticket.resolved,
      ticket.created
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

Controller.getNewTickets = async () => {
  let all = await ticketModel.find({});
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
      ticket.description,
      [],
      ticket.urgent,
      ticket.resolved,
      ticket.created
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

Controller.getOldTickets = async () => {
  let all = await ticketModel.find({});
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
      ticket.description,
      [],
      ticket.urgent,
      ticket.resolved,
      ticket.created
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
 */
Controller.deleteTicket = async (ticketID) => {
  await ticketModel.findOneAndDelete({ ticketID: ticketID });
  return true;
};

export default Controller;
