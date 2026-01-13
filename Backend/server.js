const express = require("express");
const app = express();
const connectDb = require("./db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const AuthRoute = require("./Routes/AuthRoute");
const ResumeRoute = require("./Routes/ResumeRoute");
const authMiddleware = require("./Middleware/authMiddleware");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/resumes", ResumeRoute);

// Protected route example
app.get("/api/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });
});

// Connect Database
connectDb();

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
});
