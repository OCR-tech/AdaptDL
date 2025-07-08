// =========================================//
function toggleVoiceCommand() {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  const volumeSliderCommand = document.getElementById("volume-slider-command");

  if (window.voiceStatusEnabled) {
    playVoiceStatus("Voice Command");
  }

  if (voiceCommandSwitch && volumeSliderCommand) {
    volumeSliderCommand.disabled = !voiceCommandSwitch.checked;

    localStorage.setItem(
      "voiceCommandMode",
      voiceCommandSwitch.checked ? "on" : "off"
    );
    localStorage.setItem("volumeSliderCommandValue", volumeSliderCommand.value);
  }
}

// =========================================//
function updateValueCommand(val) {
  document.getElementById("volume-value-command").textContent = val;

  // change the volume of the user microphone input based on the slider value
  if (typeof window.microphoneVolume !== "undefined") {
    window.microphoneVolume = Math.max(0, Math.min(1, val / 100));
  }
}

// =========================================//
function setVoiceCommandMode(mode) {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");

  if (voiceCommandSwitch) {
    voiceCommandSwitch.checked = mode === "on";

    // Optionally trigger change event if needed
    voiceCommandSwitch.dispatchEvent(new Event("change"));
  }
}

function setVolumeSliderCommandValue(value) {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  const volumeSliderCommand = document.getElementById("volume-slider-command");
  if (!volumeSliderCommand) return;

  // Enable or disable the slider based on the switch state
  volumeSliderCommand.disabled = !(
    voiceCommandSwitch && voiceCommandSwitch.checked
  );

  // Set the slider value
  volumeSliderCommand.value = value;

  // Optionally trigger input event if needed
  volumeSliderCommand.dispatchEvent(new Event("input"));
}
