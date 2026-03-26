const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// static folder for generated certificates
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});