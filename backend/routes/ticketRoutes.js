const express = require("express");
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Ticket (User Only)
router.post("/", authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTicket = new Ticket({ title, description, createdBy: req.user.id });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ error: "Error creating ticket" });
    }
});

// Get Tickets (Users get their own, Admins get all)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tickets = req.user.role === "admin" ? await Ticket.find() : await Ticket.find({ createdBy: req.user.id });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tickets" });
    }
});

// Admin updates ticket status
router.put("/:id", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Not authorized" });

    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });

        ticket.status = req.body.status;
        await ticket.save();
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Error updating ticket" });
    }
});

module.exports = router;
