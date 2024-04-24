import { Router } from "express";
import Controller from "../Controllers/index.js";

const router = Router();

router.get(
  "/getall",
  Controller.middleware.authentication,
  Controller.notification.getAllNotifications
);

router.get(
  "/markasread/:notificationID",
  Controller.middleware.authentication,
  Controller.notification.markAsReadNotification
);

router.get(
  "/remove/:notificationID",
  Controller.middleware.authentication,
  Controller.notification.removeNotification
);

export default router;
