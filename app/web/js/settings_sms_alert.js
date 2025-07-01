// =========================================//
/**
 * Send an SMS mobile alert using a backend API endpoint.
 * @param {string} phoneNumber - The recipient's phone number (in international format).
 * @param {string} message - The SMS message content.
 */
function sendSmsAlert(phoneNumber, message) {
  // Example: POST to your backend API that integrates with Twilio or similar SMS service
  fetch("/api/send-sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: phoneNumber,
      body: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("status").innerText = "SMS alert sent!";
      } else {
        document.getElementById("status").innerText =
          "Failed to send SMS alert.";
      }
    })
    .catch((error) => {
      document.getElementById("status").innerText = "Error sending SMS alert.";
      console.error("SMS Alert Error:", error);
    });
}
