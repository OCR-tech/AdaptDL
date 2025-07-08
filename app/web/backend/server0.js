// =========================================== //
const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/send-email", (req, res) => {
  // Use nodemailer or another service to send the email here
  // For now, just simulate success:
  res.json({ success: true });
});

app.listen(5500, () => console.log("Server running on port 5500"));

// // =========================================== //
// const { createServer } = require("node:http");

// const hostname = "127.0.0.1";
// const port = 5500;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(
//     `Server running at http://${hostname}:${port}/app/web/index.html`
//   );
// });
