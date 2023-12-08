const User = require("../../Modals/UserModal");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      res.status(201).json({ users: allUsers });
    } else {
      res.status(201).json({ message: "there no users to display" });
    }
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}
module.exports = getAllUsers;
