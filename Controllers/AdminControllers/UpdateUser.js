const User = require("../../Modals/UserModal");

async function UpdateUsers(req, res) {
  try {
    const { role, dep, userId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: role, departement: dep } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}

module.exports = UpdateUsers;
