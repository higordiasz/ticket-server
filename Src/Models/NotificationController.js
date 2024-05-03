import Model from "./NotificationModel.js";
import { userModel as UserModel } from "./UserModel.js";
import { Notification } from "../Helpers/index.js";

const Controller = {};
const officenotification = ["admin", "support"];
/**
 *
 * @param {Notification} notification
 * @param {String} userID
 * @returns {Promise<Boolean>}
 */
Controller.createNotification = async (notification, userID) => {
  const user = await UserModel.findOne({ userID: userID });
  if (!user && !officenotification.includes(userID)) return false;
  const notifications = await Model.findOne({ userID: userID });
  if (!notifications) {
    const created = await Model.create({
      notifications: [notification.convertToJson()],
      userID: userID,
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    return created;
  } else {
    notifications.notifications.push(notification.convertToJson());
    const saved = await notifications
      .save()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    return saved;
  }
};

/**
 *
 * @param {String} notificationID
 * @param {String} userID
 * @returns {Promise<Boolean>}
 */
Controller.markAsRead = async (notificationID, userID) => {
  const user = await UserModel.findOne({ userID: userID });
  if (!user && !officenotification.includes(userID)) return false;
  const notifications = await Model.findOne({ userID: userID });
  if (!notifications) return false;
  const index = notifications.notifications.findIndex(
    (n) => n.notificationID === notificationID
  );
  notifications.notifications[index].read = true;
  const saved = await notifications
    .save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return saved;
};

/**
 *
 * @param {String} notificationID
 * @param {String} userID
 * @returns {Promise<Boolean}
 */
Controller.removeNotification = async (notificationID, userID) => {
  const user = await UserModel.findOne({ userID: userID });
  if (!user && !officenotification.includes(userID)) return false;
  const notifications = await Model.findOne({ userID: userID });
  if (!notifications) return false;
  notifications.notifications = notifications.notifications.filter(
    (n) => n.notificationID !== notificationID
  );
  const saved = await notifications
    .save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return saved;
};

/**
 *
 * @param {String} userID
 * @returns {Promise<Array<Notification>>}
 */
Controller.getAllNotification = async (userID) => {
  const user = await UserModel.findOne({ userID: userID });
  if (!user && !officenotification.includes(userID)) return null;
  const notifications = await Model.findOne({ userID: userID });
  if (!notifications) return [];
  let ret = [];
  notifications.notifications.forEach((a) => {
    const aux = new Notification(
      a.title,
      a.message,
      a.type,
      a.read,
      a.notificationID,
      a.created
    );
    ret.push(aux);
  });
  return ret;
};

export default Controller;
