const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Ticket", TicketSchema);
