import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  notifications: {
    type: Array,
    required: true,
  },
});

const notificationModel = model("notification", notificationSchema);

export default notificationModel;
