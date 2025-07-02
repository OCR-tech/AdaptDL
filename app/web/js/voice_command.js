// =========================================//
// Set toggle state from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  const volumeSlider = document.getElementById("volume-slider-command");

  // alert(
  //   "voiceCommandSwitch:",
  //   voiceCommandSwitch,
  //   "volumeSlider:",
  //   volumeSlider
  // );

  if (!voiceCommandSwitch || !volumeSlider) return;
  // Set the switch state from localStorage
  voiceCommandSwitch.checked =
    localStorage.getItem("voiceCommandMode") === "on";
  volumeSlider.value = localStorage.getItem("volumeSliderCommandValue") || 50;

  // Set initial enabled/disabled state
  volumeSlider.disabled = !voiceCommandSwitch.checked;

  // Add event listener
  voiceCommandSwitch.addEventListener("change", toggleVoiceCommand);
  volumeSlider.addEventListener("input", toggleVoiceCommand);
});

// =========================================//
function toggleVoiceCommand() {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  const volumeSlider = document.getElementById("volume-slider-command");

  if (voiceCommandSwitch && volumeSlider) {
    volumeSlider.disabled = !voiceCommandSwitch.checked;

    localStorage.setItem(
      "voiceCommandMode",
      voiceCommandSwitch.checked ? "on" : "off"
    );
    localStorage.setItem("volumeSliderCommandValue", volumeSlider.value);
  }
}
