// =========================================//
function setSourceMode(mode) {
  const sourceSwitch = document.getElementById("source-switch");
  // alert("setSourceMode called, sourceSwitch:", sourceSwitch, "mode:", mode);

  if (sourceSwitch) {
    sourceSwitch.checked = mode === "on";
    sourceSwitch.dispatchEvent(new Event("change"));
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

// =========================================//
function setVoiceAlertMode(mode) {
  const voiceAlertSwitch = document.getElementById("voice-alert-switch");

  if (voiceAlertSwitch) {
    voiceAlertSwitch.checked = mode === "on";
    voiceAlertSwitch.dispatchEvent(new Event("change"));
  }
}

function setVolumeSliderAlertValue(value) {
  const voiceAlertSwitch = document.getElementById("voice-alert-switch");
  const volumeSliderAlert = document.getElementById("volume-slider-alert");
  if (!volumeSliderAlert) return;

  // Enable or disable the slider based on the switch state
  volumeSliderAlert.disabled = !(voiceAlertSwitch && voiceAlertSwitch.checked);

  // Set the slider value
  volumeSliderAlert.value = value;

  // Optionally trigger input event if needed
  volumeSliderAlert.dispatchEvent(new Event("input"));
}

// =========================================//
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[include-html]").forEach(function (el) {
    const file = el.getAttribute("include-html");
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;

        // Attach handler after include
        if (el.id === "group-frame-source") {
          const select = el.querySelector("#video-source");
          if (select && typeof updateVideoSource === "function") {
            select.onchange = updateVideoSource;
          }
        }

        // Re-apply theme after content is loaded
        const savedTheme = localStorage.getItem("theme") || "light";
        if (typeof setTheme === "function") setTheme(savedTheme);

        // Re-apply source mode after content is loaded
        const sourceMode = localStorage.getItem("sourceMode") || "off";
        if (typeof setSourceMode === "function") setSourceMode(sourceMode);

        // Re-apply voice command and volume slider after content is loaded
        const voiceCommandMode =
          localStorage.getItem("voiceCommandMode") || "off";
        if (typeof setVoiceCommandMode === "function")
          setVoiceCommandMode(voiceCommandMode);

        const volumeSliderCommandValue =
          localStorage.getItem("volumeSliderCommandValue") || 50;
        if (typeof setVolumeSliderCommandValue === "function")
          setVolumeSliderCommandValue(volumeSliderCommandValue);

        // Re-apply voice alert and volume slider after content is loaded
        const voiceAlertMode = localStorage.getItem("voiceAlertMode") || "off";
        if (typeof setVoiceAlertMode === "function")
          setVoiceAlertMode(voiceAlertMode);

        const volumeSliderAlertValue =
          localStorage.getItem("volumeSliderAlertValue") || 50;
        if (typeof setVolumeSliderAlertValue === "function")
          setVolumeSliderAlertValue(volumeSliderAlertValue);
      })

      .catch(() => {
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });
});
