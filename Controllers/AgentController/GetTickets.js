const User = require("../../Modals/UserModal");
const { Ticket } = require("../../Modals/TicketModal");

async function GetTickets(req, res) {
  try {
    const { dep } = req.params;
    console.log("Type:", dep);
    const tickets = await Ticket.find({ type: dep });
    console.log(tickets);
    if (tickets) {
      res.status(201).json({ userTickets: tickets });
    } else {
      res.status(201).json({ message: "there is not tickets to display" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}
module.exports = GetTickets;
