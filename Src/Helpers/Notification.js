class Notification {
  /**
   *
   * @param {String} title
   * @param {String} message
   * @param {String} type
   * @param {Boolean} read
   * @param {String} notificationID
   * @param {Date} created
   */
  constructor(title, message, type, read, notificationID, created) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.read = read;
    this.notificationID = notificationID;
    this.created = created;
  }

  /**
   * Convert to JSON format
   * @returns {Object}
   */
  convertToJson() {
    return {
      title: this.title,
      message: this.message,
      type: this.type,
      read: this.read,
      notificationID: this.notificationID,
      created: this.created,
    };
  }

  /** Possibles types of Notification */
  static NotificationType = ["create", "message", "closed"];

  /**
   *
   * @param {Object} notification
   * @returns {Boolean}
   */
  static checkFormat(notification) {
    if (!notification.title) return false;
    if (!notification.message) return false;
    if (!notification.type) return false;
    if (typeof notification.title != "string") return false;
    if (typeof notification.message != "string") return false;
    if (typeof notification.type != "string") return false;
    if (!this.NotificationType.includes(notification.type)) return false;
    return true;
  }

  /**
   *
   * @returns {String}
   */
  static generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  /**
   *
   * @param {Array<Notification>} array
   * @returns {Array<Object>}
   */
  static convertArrayToJson(array) {
    if (!Array.isArray(array)) return null;
    const ret = [];
    array.forEach((a) => {
      ret.push(a.convertToJson());
    });
    return ret;
  }
}

export default Notification;
