const { Ticket } = require("../../Modals/TicketModal");
async function GetAgentickets(req, res) {
  try {
    const user = req.body;
    const tickets = await Ticket.find({ type: user.departement });
    res.status(201).json({ tickets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}
module.exports = GetAgentickets;
