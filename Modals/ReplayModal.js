const { text } = require("express");
const mongoose = require("mongoose");
const { Types } = mongoose.Schema;
const ReplaySchema = new mongoose.Schema(
  {
    solvedBy: { type: Types.ObjectId, ref: "User" },
    txt: { type: String },
    image: { type: [Buffer], required: true },
    ticketId: { type: Types.ObjectId, ref: "Ticket" },
  },
  { timestamps: true }
);
const Replay = mongoose.model("Replay", ReplaySchema);
module.exports = { Replay };
