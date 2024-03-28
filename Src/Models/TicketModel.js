import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

const ticketModel = model("user", ticketSchema);

export { ticketModel };
