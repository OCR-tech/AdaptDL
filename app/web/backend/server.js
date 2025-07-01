// Example: server.js
const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/send-email", (req, res) => {
  // Use nodemailer or another service to send the email here
  // For now, just simulate success:
  res.json({ success: true });
});

app.listen(5500, () => console.log("Server running on port 5500"));
