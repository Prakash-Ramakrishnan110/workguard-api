const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (optional but useful)
app.get("/", (req, res) => {
  res.send("✅ WorkGuard AI API is running");
});

// ✅ MAIN API ENDPOINT
app.post("/api/employee-data", (req, res) => {
  const {
    employee_id,
    hours_worked,
    screen_time,
    focus_hours,
    productivity_score
  } = req.body;

  // 🛑 Basic validation
  if (!employee_id) {
    return res.status(400).json({
      status: "error",
      message: "employee_id is required"
    });
  }

  // 🧠 SIMPLE AI / RISK LOGIC (RULE-BASED)
  let risk_level = "Low";
  let risk_score = 20;
  let reason = "Normal work pattern";

  if (screen_time > 10 && focus_hours < 3) {
    risk_level = "High";
    risk_score = 85;
    reason = "High screen time with low focus (burnout or misuse risk)";
  } else if (hours_worked < 5 || productivity_score < 40) {
    risk_level = "Medium";
    risk_score = 55;
    reason = "Low working hours or reduced productivity";
  }

  // ✅ Final response
  return res.json({
    status: "success",
    employee_id,
    risk_level,
    risk_score,
    reason
  });
});

// ✅ IMPORTANT: Render / Cloud compatible PORT
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WorkGuard AI API running on port ${PORT}`);
});
