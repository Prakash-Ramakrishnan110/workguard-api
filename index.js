const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "WorkGuard AI API running",
    time: new Date().toISOString()
  });
});

app.post("/collect", (req, res) => {
  const {
    employee_id,
    screen_time,
    focus_hours,
    task_switches,
    productivity_score
  } = req.body;

  if (!employee_id) {
    return res.status(400).json({
      status: "error",
      message: "employee_id required"
    });
  }

  let risk_score = 30;
  let risk_level = "Low";
  let risk_reason = "Healthy work pattern";

  if (screen_time > 9 && focus_hours < 3) {
    risk_score = 85;
    risk_level = "High";
    risk_reason = "High screen time with low focus";
  } else if (task_switches > 40) {
    risk_score = 65;
    risk_level = "Medium";
    risk_reason = "Frequent task switching";
  }

  res.json({
    status: "success",
    employee_id,
    risk_level,
    risk_score,
    reason: risk_reason
  });
});

app.post("/analyze", (req, res) => {
  res.json({
    status: "success",
    message: "Analysis completed",
    results: []
  });
});

app.listen(PORT, () => {
  console.log(`WorkGuard AI API running on port ${PORT}`);
});
