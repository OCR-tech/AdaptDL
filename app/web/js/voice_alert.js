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
    window.voiceAlertEnabled = voiceAlertSwitch.checked; // <-- FIXED LINE
    window.speechSynthesis.cancel();
    localStorage.setItem(
      "voiceAlertMode",
      voiceAlertSwitch.checked ? "on" : "off"
    );
    localStorage.setItem("volumeSliderAlertValue", volumeSliderAlert.value);
  }
}

// =========================================//
function playVoiceAlertOnDetection(message = "Object detected!") {
  // Check the global flag before playing
  if (
    typeof window.voiceAlertEnabled !== "undefined" &&
    !window.voiceAlertEnabled
  ) {
    return; // Do not play if disabled
  }

  const voiceAlertSwitch = document.getElementById("voice-alert-switch");
  const volumeSliderAlert = document.getElementById("volume-slider-alert");

  if (voiceAlertSwitch && voiceAlertSwitch.checked) {
    const utter = new SpeechSynthesisUtterance(message);
    if (volumeSliderAlert) {
      utter.volume = Math.max(0, Math.min(1, volumeSliderAlert.value / 100));
    }
    window.speechSynthesis.speak(utter);
  }
}

// =========================================//
function updateValueAlert(val) {
  document.getElementById("volume-value-alert").textContent = val;

  // change the volume of the speech synthesis based on the slider value
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    const utter = new SpeechSynthesisUtterance();
    utter.volume = Math.max(0, Math.min(1, val / 100));
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    window.speechSynthesis.speak(utter); // Speak with the new volume
  }
}
