const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const connectDB = require("./config/MongoDB");

app.use(
  cors({
    origin: "http://localhost:3002", // Allow requests from the frontend server
    credentials: true, // Allow credentials like cookies, authorization headers, etc. (if needed)
  })
);

app.use(express.json());

connectDB();

app.use(require("./Routes/index"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
