const Ticket = require("../models/ticketModel");

exports.createTicket = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }
  
      const ticket = new Ticket({
        title,
        description,
        status: "Open",
        userId: req.user.id,
      });
  
      await ticket.save();
      res.status(201).json({ message: "Ticket created successfully", ticket });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
// Get tickets (User sees only their tickets, Admin sees all)
exports.getTickets = async (req, res) => {
  try {
    let tickets;
    if (req.user.role === "admin") {
      tickets = await Ticket.find(); // Admin sees all tickets
    } else {
      tickets = await Ticket.find({ userId: req.user.id }); // Users see only their tickets
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Update ticket status (Admin only)
exports.updateTicketStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const ticketId = req.params.id;
  
      if (!["Open", "In Progress", "Closed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      ticket.status = status;
      await ticket.save();
  
      res.status(200).json({ message: "Ticket status updated", ticket });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
