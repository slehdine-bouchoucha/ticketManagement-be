const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const connectDB = require("./config/MongoDB");

app.use(cors());
app.use(express.json());

connectDB();

app.use(require("./Routes/index"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
