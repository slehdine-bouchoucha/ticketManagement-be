const { Ticket } = require("../../Modals/TicketModal");

async function getTicketsController(req, res) {
  try {
    const { user } = req;

    const userTickets = await Ticket.find({ createdBy: user["_id"] });

    return res.status(200).json({ userTickets });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}

module.exports = getTicketsController;
