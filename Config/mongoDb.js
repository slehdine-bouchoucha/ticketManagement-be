const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://slehdine:sleh97727809@cluster0.oh0eey4.mongodb.net/Tickets?retryWrites=true&w=majority";

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("error : ", error);
  }
};

module.exports = ConnectDB;
