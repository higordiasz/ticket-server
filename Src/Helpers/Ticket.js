class Ticket {
  /**
   *
   * @param {String} ownerID
   * @param {String} title
   * @param {String} description
   * @param {String} ticketID
   * @param {Array<Message>} messages
   * @param {Boolean} urgent
   * @param {Boolean} resolved
   * @param {Date} created
   */
  constructor(
    ownerID,
    title,
    description,
    messages,
    ticketID = "",
    urgent = false,
    resolved = false,
    created = new Date(Date.now())
  ) {
    this.created = created;
    this.title = title;
    this.ticketID = ticketID;
    this.ownerID = ownerID;
    this.description = description;
    this.messages = messages;
    this.urgent = urgent;
    this.resolved = resolved;
  }

  /**
   *
   * @param {Array<Ticket} tickets
   * @returns {Array<Object>}
   */
  static arrayToJson(tickets) {
    let aux = [];
    for (let i = 0; i < tickets.length; i++) {
      aux.push(tickets[i].covnertToJson());
    }
    return aux;
  }

  /**
   *
   * @param {JSON} ticket
   * @returns {Boolean}
   */
  static validateFormat(ticket) {
    if (!ticket.created) return false;
    if (!ticket.ownerID) return false;
    if (!ticket.title) return false;
    if (!ticket.ticketID) return false;
    if (!ticket.description) return false;
    if (!ticket.messages) return false;
    if (ticket.urgent == null) return false;
    if (!ticket.resolved == null) return false;
    if (typeof ticket.created != "date") return false;
    if (typeof ticket.ownerID != "string") return false;
    if (typeof ticket.description != "string") return false;
    if (typeof ticket.ticketID != "string") return false;
    if (typeof ticket.title != "string") return false;
    if (!Array.isArray(ticket.messages)) return false;
    if (typeof ticket.urgent != "boolean") return false;
    if (typeof ticket.resolved != "boolean") return false;
    return true;
  }

  /**
   *
   * @returns {Object}
   */
  covnertToJson() {
    let messagesJson = [];
    for (let i = 0; i < this.messages; i++) {
      messagesJson.push(this.messages[i].covnertToJson());
    }
    return {
      created: this.created,
      title: this.title,
      description: this.description,
      messages: this.messages,
      ownerID: this.ownerID,
      resolved: this.resolved,
      urgent: this.urgent,
    };
  }

  /**
   *
   * @returns {Array<Object>}
   */
  messagesJson() {
    let messagesJson = [];
    for (let i = 0; i < this.messages; i++) {
      messagesJson.push(this.messages[i].covnertToJson());
    }
    return messagesJson;
  }

  /**
   *
   * @param {String} fullName
   * @param {String} message
   * @param {Number} type
   * @param {String} ownerID
   */
  addMessage(fullName, message, type, ownerID) {
    let m = new Message(fullName, message, type, ownerID);
    this.messages.push(m);
  }
}

class Message {
  /**
   *
   * @param {String} fullName
   * @param {String} message
   * @param {Number} type
   * @param {String} ownerID
   */
  constructor(fullName, message, type, ownerID) {
    this.fullName = fullName;
    this.message = message;
    this.type = type;
    this.ownerID = ownerID;
  }

  /**
   *
   * @returns {Object}
   */
  covnertToJson() {
    return {
      fullName: this.fullName,
      message: this.message,
      type: this.type,
      ownerID: this.ownerID,
    };
  }
}

export { Ticket, Message };
