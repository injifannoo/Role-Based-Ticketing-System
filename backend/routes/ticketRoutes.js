const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const ticketController = require("../controllers/ticketController");

router.get("/", authenticateUser, ticketController.getTickets);
router.put("/:id", authenticateUser, authorizeAdmin, ticketController.updateTicketStatus);

module.exports = router;
