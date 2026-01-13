const express = require("express");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Create logs folder if it doesn't exist
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Simple logger
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(path.join(logsDir, "server.log"), logMessage);
}

// PostgreSQL pool using .env variables
const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "companydb",
});

// Routes
app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
    log("Fetched employees");
  } catch (err) {
    console.error(err);
    log(`Error fetching employees: ${err.message}`);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/health", (req, res) => {
  res.send("OK");
  log("Health check OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  log(`Server started on port ${PORT}`);
});
