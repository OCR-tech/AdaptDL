// =========================================== //
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
const PORT = 5500;

// Serve static files from the web directory
app.use(express.static(__dirname + "/.."));

// Post endpoint to handle email sending
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ocrtech.mail@gmail.com", // <-- your Gmail address
    pass: "itfo jfcq uwin hzaz", // <-- your Gmail App Password
  },
});

app.post("/api/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "ocrtech.mail@gmail.com", // <-- your Gmail address
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
    res.json({ success: true, info });
  });
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/index.html`);
});
