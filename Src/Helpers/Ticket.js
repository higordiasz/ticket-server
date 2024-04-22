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
    created = new Date(Date.now()),
    problem = "others",
    department = ""
  ) {
    this.created = created;
    this.title = title;
    this.ticketID = ticketID;
    this.ownerID = ownerID;
    this.description = description;
    this.messages = messages;
    this.urgent = urgent;
    this.resolved = resolved;
    this.problem = problem;
    this.department = department;
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
   * @param {Array<Ticket>} tickets
   * @returns {TicketsTypes}
   */
  static organizeArrayByType(tickets) {
    let news = [];
    let olds = [];
    let closed = [];
    let urgent = [];
    tickets.forEach((t) => {
      if (t.isClosed()) closed.push(t);
      else if (t.isUrgent()) urgent.push(t);
      else if (t.isNew()) news.push(t);
      else olds.push(t);
    });
    return new TicketsTypes(news, olds, urgent, closed);
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
    if (ticket.resolved == null) return false;
    if (!ticket.problem) return false;
    if (!ticket.department) return false;
    if (typeof ticket.created != "date") return false;
    if (typeof ticket.ownerID != "string") return false;
    if (typeof ticket.description != "string") return false;
    if (typeof ticket.ticketID != "string") return false;
    if (typeof ticket.title != "string") return false;
    if (!Array.isArray(ticket.messages)) return false;
    if (typeof ticket.urgent != "boolean") return false;
    if (typeof ticket.resolved != "boolean") return false;
    if (typeof ticket.problem != "string") return false;
    if (typeof ticket.department != "string") return false;
    return true;
  }

  /**
   *
   * @param {Array<Ticket>} tickets
   * @returns {Array<Ticket>}
   */
  static organizeArrayToCreatedDate(tickets) {
    let aux = tickets;
    aux.sort((a, b) => {
      let date1 = new Date(a.created);
      let date2 = new Date(b.created);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
    return aux;
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
      ticketID: this.ticketID,
      problem: this.problem,
      department: this.department,
    };
  }

  /**
   *
   * @returns {Array<Object>}
   */
  messagesJson() {
    let messagesJson = [];
    for (let i = 0; i < this.messages.length; i++) {
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

  /**
   *
   * @returns {Boolean}
   */
  isNew() {
    let created = new Date(this.created);
    let now = new Date(Date.now());
    let timeDiff = Math.abs(created.getTime() - now.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 7) return true;
    return false;
  }

  /**
   *
   * @returns {Boolean}
   */
  isUrgent() {
    if (this.urgent) return true;
    return false;
  }

  /**
   *
   * @returns {Boolean}
   */
  isClosed() {
    if (this.resolved) return true;
    return false;
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

class TicketsTypes {
  /**
   *
   * @param {Array<Ticket>} news
   * @param {Array<Ticket>} old
   * @param {Array<Ticket>} urgent
   * @param {Array<Ticket>} closed
   */
  constructor(news, old, urgent, closed) {
    this.News = news;
    this.Old = old;
    this.Urgent = urgent;
    this.Closed = closed;
  }
}

export { Ticket, Message };
