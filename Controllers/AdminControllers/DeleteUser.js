const User = require("../../Modals/UserModal");

async function deleteUser(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "The ID of the user is missing" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "ADMIN") {
      return res.status(401).json({ message: "You can't delete an ADMIN" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    return res.status(201).json({ user: deletedUser, message: "Deleted user" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = deleteUser;
