import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  created: {
    type: Date,
    required: true,
  },
  ticketID: {
    type: String,
    required: true,
  },
  ownerID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
  urgent: {
    type: Boolean,
    required: true,
  },
  resolved: {
    type: Boolean,
    required: true,
  },
});

const ticketModel = model("ticket", ticketSchema);

export { ticketModel };
