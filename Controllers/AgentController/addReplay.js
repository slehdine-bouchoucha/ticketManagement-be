const { Replay } = require("../../Modals/ReplayModal");
const { Ticket } = require("../../Modals/TicketModal");

async function addReplay(req, res) {
  try {
    const formData = req.body;
    const { ticketId, solvedBy, txt } = formData;
    const images = req.files ? req.files.map((file) => file.buffer) : [];
    const newReplay = new Replay({
      solvedBy,
      txt,
      image: images,
      ticketId,
    });
    await newReplay.save();
    console.log(newReplay);
    return res.status(201).json({ Replay: Replay });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}
module.exports = addReplay;
