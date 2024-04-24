import Notification from "./Notification.js";

const Helper = {};
const Messages = {};
const Titles = {};

Messages.newMessage = {
  en: "A new message has been added to a ticket.",
  "pb-br": "Uma nova mensagem foi adicionada a um chamado.",
};
Titles.newMessage = {
  en: "New Message",
  "pt-br": "Nova Mensagem",
};
/**
 *
 * @param {String} language
 * @returns {Notification}
 */
Helper.newMessageNotification = (language = "en") => {
  const title = Titles.newMessage[language];
  const message = Messages.newMessage[language];
  return new Notification(
    title,
    message,
    "message",
    false,
    Notification.generateID(),
    new Date(Date.now())
  );
};

Messages.newTicketCreate = {
  en: "A new ticket as been created.",
  "pt-br": "Foi aberto um novo chamado.",
};
Titles.newTicketCreate = {
  en: "New Ticket",
  "pt-br": "Novo Chamado",
};
/**
 *
 * @param {String} language
 * @returns {Notification}
 */
Helper.newTicketCreate = (language = "en") => {
  const title = Titles.newTicketCreate[language];
  const message = Messages.newTicketCreate[language];
  return new Notification(
    title,
    message,
    "create",
    false,
    Notification.generateID(),
    new Date(Date.now())
  );
};
export default Helper;
