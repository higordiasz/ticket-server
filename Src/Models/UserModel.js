import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});

const userModel = model("user", userSchema);

export { userModel };
