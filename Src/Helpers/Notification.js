import { Controllers } from "../Models/index.js";

class Notification {
  /**
   *
   * @param {String} title
   * @param {String} message
   * @param {String} type
   * @param {Boolean} read
   * @param {String} notificationID
   * @param {String} ticketID
   * @param {Date} created
   */
  constructor(title, message, type, read, notificationID, ticketID, created) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.read = read;
    this.notificationID = notificationID;
    this.ticketID = ticketID;
    this.created = created;
  }

  /**
   * Convert to JSON format
   * @returns {{title, message, type, read, notificationID, ticketID, created}}
   */
  convertToJson() {
    return {
      title: this.title,
      message: this.message,
      type: this.type,
      read: this.read,
      notificationID: this.notificationID,
      ticketID: this.ticketID,
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

  /**
   *
   * @param {{title, message, type, ticketID}} body
   * @returns {Notification}
   */
  static createNotificationFromObject(body) {
    if (!this.checkFormat(body)) return null;
    return new Notification(
      body.title,
      body.message,
      body.type,
      false,
      this.generateID(),
      this.ticketID,
      new Date(Date.now())
    );
  }

  /**
   *
   * @param {String} userID
   * @param {Notification} notification
   * @returns {Promise<Boolean>}
   */
  static async sendNotificationToUser(userID, notification) {
    const created = await Controllers.notification.createNotification(
      notification,
      userID
    );
    return created;
  }

  /**
   *
   * @param {Notification} notification
   * @returns {Promise<Boolean>}
   */
  static async sendNotificationToSupport(notification) {
    const created = await Controllers.notification.createNotification(
      notification,
      "support"
    );
    return created;
  }

  /**
   *
   * @param {Notification} notification
   * @returns {Promise<Boolean>}
   */
  static async sendNotificationToAdmin(notification) {
    const created = await Controllers.notification.createNotification(
      notification,
      "admin"
    );
    return created;
  }
}

export default Notification;
