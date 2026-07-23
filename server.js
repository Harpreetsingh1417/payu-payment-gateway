// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const paymentRoute = require("./routes/payment");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use("/payment", paymentRoute);


// Test API Route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Server is running successfully 🚀"
    });
});

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log("====================================");
    console.log("🚀 PayU Payment Server Started");
    console.log(`🌐 Running on http://localhost:${PORT}`);
    console.log("====================================");
});