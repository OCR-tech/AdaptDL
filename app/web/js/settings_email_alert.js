// =========================================//
function toggleEmailInput() {
  // alert("ToggleEmailInput");
  const emailAlertSwitch = document.getElementById("email-switch");
  const emailInput = document.getElementById("email-user");
  const btnOkEmail = document.getElementById("btn-ok-email");

  if (emailAlertSwitch && emailAlertSwitch.checked) {
    if (emailInput) emailInput.style.display = "inline-block";
    if (btnOkEmail) btnOkEmail.style.display = "inline-block";
  } else {
    if (emailInput) emailInput.style.display = "none";
    if (btnOkEmail) btnOkEmail.style.display = "none";
  }
}

// =========================================//
/**
 * Send an email alert using a backend API endpoint.
 * @param {string} toEmail - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} message - Email body content.
 */
function sendEmailAlert(toEmail, subject, message) {
  // Example: POST to your backend API that sends the email
  fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: toEmail,
      subject: subject,
      body: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("status").innerText = "Email alert sent!";
      } else {
        document.getElementById("status").innerText =
          "Failed to send email alert.";
      }
    })
    .catch((error) => {
      document.getElementById("status").innerText =
        "Error sending email alert.";
      console.error("Email Alert Error:", error);
    });
}
