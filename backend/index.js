require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Test database connection
app.get("/api/health/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      status: "healthy",
      database: "connected",
      timestamp: result.rows[0].now,
    });
  } catch (err) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: err.message,
    });
  }
});

// Votre route existante
app.get("/api/message", async (req, res) => {
  try {
    const result = await pool.query("SELECT content FROM messages LIMIT 1");
    if (result.rows.length === 0) {
      return res.json({ message: "No messages found" });
    }
    res.json({ message: result.rows[0].content });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
