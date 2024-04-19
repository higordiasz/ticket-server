class Ticket {
  /**
   *
   * @param {String} ownerID
   * @param {String} description
   * @param {Array<Message>} messages
   * @param {Boolean} urgent
   * @param {Boolean} resolved
   * @param {Date} created
   */
  constructor(
    ownerID,
    description,
    messages,
    urgent = false,
    resolved = false,
    created = new Date(Date.now())
  ) {
    this.created = created;
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
    if (!ticket.description) return false;
    if (!ticket.messages) return false;
    if (ticket.urgent == null) return false;
    if (!ticket.resolved == null) return false;
    if (typeof ticket.created != "date") return false;
    if (typeof ticket.ownerID != "string") return false;
    if (typeof ticket.description != "string") return false;
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
