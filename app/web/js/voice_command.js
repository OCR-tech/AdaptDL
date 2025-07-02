// =========================================//
// Set toggle state from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  const volumeSliderCommand = document.getElementById("volume-slider-command");

  if (!voiceCommandSwitch || !volumeSlider) return;
  // Set the switch state from localStorage
  voiceCommandSwitch.checked =
    localStorage.getItem("voiceCommandMode") === "on";
  volumeSliderCommand.value =
    localStorage.getItem("volumeSliderCommandValue") || 50;

  // Set initial enabled/disabled state
  volumeSliderCommand.disabled = !voiceCommandSwitch.checked;

  // Add event listener
  voiceCommandSwitch.addEventListener("change", toggleVoiceCommand);
  volumeSliderCommand.addEventListener("input", toggleVoiceCommand);
});

// =========================================//
function toggleVoiceCommand() {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  const volumeSliderCommand = document.getElementById("volume-slider-command");

  if (voiceCommandSwitch && volumeSliderCommand) {
    volumeSliderCommand.disabled = !voiceCommandSwitch.checked;

    localStorage.setItem(
      "voiceCommandMode",
      voiceCommandSwitch.checked ? "on" : "off"
    );
    localStorage.setItem("volumeSliderCommandValue", volumeSliderCommand.value);
  }
}
