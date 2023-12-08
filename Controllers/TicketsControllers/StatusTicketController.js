const { Ticket } = require("../../Modals/TicketModal");

async function changeStatusController(req, res) {
  try {
    const ticketId = req.params.ticketId;
    const { status } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ updatedTicket });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = changeStatusController;
