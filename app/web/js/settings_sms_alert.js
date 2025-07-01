// =========================================//
function toggleSmsInput() {
  const smsAlertSwitch = document.getElementById("sms-switch");
  const smsInput = document.getElementById("sms-user");
  const btnOkSms = document.getElementById("btn-ok-sms");

  if (smsAlertSwitch && smsAlertSwitch.checked) {
    if (smsInput) smsInput.style.display = "inline-block";
    if (btnOkSms) btnOkSms.style.display = "inline-block";
  } else {
    if (smsInput) smsInput.style.display = "none";
    if (btnOkSms) btnOkSms.style.display = "none";
  }
}

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
