// =========================================//
// Video resolution selection
function selectVideoResolution() {
  const videoResolution = document.getElementById("video-resolution").value;
  document.getElementById("status").innerText =
    "Video resolution set to: " + videoResolution;
  // Here you would typically send the selected resolution to the backend
}

// =========================================//
// Video frame rate selection
function selectVideoFrameRate() {
  const videoFrameRate = document.getElementById("video-frame-rate").value;
  document.getElementById("status").innerText =
    "Video frame rate set to: " + videoFrameRate;
  // Here you would typically send the selected frame rate to the backend
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
