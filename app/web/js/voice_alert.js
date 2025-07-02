// =========================================//
// Set toggle state from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const voiceAlertSwitch = document.getElementById("voice-alert-switch");
  const volumeSliderAlert = document.getElementById("volume-slider-alert");

  if (!voiceAlertSwitch || !volumeSliderAlert) return;
  // Set the switch state from localStorage
  voiceAlertSwitch.checked = localStorage.getItem("voiceAlertMode") === "on";
  volumeSliderAlert.value =
    localStorage.getItem("volumeSliderAlertValue") || 50;

  // Set initial enabled/disabled state
  volumeSliderAlert.disabled = !voiceAlertSwitch.checked;

  // Add event listener
  voiceAlertSwitch.addEventListener("change", toggleVoiceAlert);
  volumeSliderAlert.addEventListener("input", toggleVoiceAlert);
});

// =========================================//
function toggleVoiceAlert() {
  const voiceAlertSwitch = document.getElementById("voice-alert-switch");
  const volumeSliderAlert = document.getElementById("volume-slider-alert");

  if (voiceAlertSwitch && volumeSliderAlert) {
    volumeSliderAlert.disabled = !voiceAlertSwitch.checked;

    localStorage.setItem(
      "voiceAlertMode",
      voiceAlertSwitch.checked ? "on" : "off"
    );
    localStorage.setItem("volumeSliderAlertValue", volumeSliderAlert.value);
  }
}
