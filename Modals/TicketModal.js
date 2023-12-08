const mongoose = require("mongoose");
const { Types } = mongoose.Schema;

const TicketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, uppercase: true, trim: true },
    description: { type: String, required: true, uppercase: true, trim: true },
    type: { type: String, required: true, uppercase: true, trim: true },
    image: { type: [Buffer], required: true },
    status: {
      type: String,
      default: "in progress",
      uppercase: true,
      trim: true,
    },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = { Ticket };
