const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to Database
connectDB();

// Import routes
const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
