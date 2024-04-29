import UserEvent from "./UserEvents/index.js";
import TicketEvent from "./TicketEvents/index.js";

const Types = ["user", "ticket"];

const Events = {
  User: UserEvent,
  Ticket: TicketEvent,
  Types: Types,
};

export default Events;
