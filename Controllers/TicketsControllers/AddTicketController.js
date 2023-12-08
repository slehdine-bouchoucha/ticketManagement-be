const { Ticket } = require("../../Modals/TicketModal");

async function AddTicketsController(req, res) {
  try {
    const formData = req.body;
    const { title, description, createdBy, type, status } = formData;
    const images = req.files.map((file) => file.buffer);
    const newTicket = new Ticket({
      title,
      description,
      type,
      image: images,
      status,
      createdBy,
    });

    await newTicket.save();
    console.log(newTicket);

    return res.status(200).json({ ticket: newTicket });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}

module.exports = AddTicketsController;
