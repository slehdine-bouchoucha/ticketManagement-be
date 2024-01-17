const { Ticket } = require("../../Modals/TicketModal");
const { Replay } = require("../../Modals/ReplayModal");
async function getTicketByIdController(req, res) {
  try {
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findOne({ _id: ticketId }).populate(
      "createdBy",
      "userName fullName email"
    );
    const replay = await Replay.find({ ticketId }).populate(
      "solvedBy",
      "userName fullName email role"
    );

    return res.status(200).json({
      ticket: {
        ...ticket["_doc"],
        replay,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}

module.exports = getTicketByIdController;
