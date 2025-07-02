// =========================================//
function setSourceMode(mode) {
  const sourceSwitch = document.getElementById("source-switch");

  alert("setSourceMode called, sourceSwitch:", sourceSwitch, "mode:", mode);

  if (sourceSwitch) {
    sourceSwitch.checked = mode === "on";
    sourceSwitch.dispatchEvent(new Event("change"));
  }
}

function setVoiceCommandMode(mode) {
  const voiceCommandSwitch = document.getElementById("voice-command-switch");
  if (voiceCommandSwitch) {
    voiceCommandSwitch.checked = mode === "on";
    // Optionally trigger change event if needed
    voiceCommandSwitch.dispatchEvent(new Event("change"));
  }
}

function setVolumeSliderValue(value) {
  const volumeSlider = document.getElementById("volume-slider-command");
  if (volumeSlider) {
    volumeSlider.value = value;
    // Optionally trigger input event if needed
    volumeSlider.dispatchEvent(new Event("input"));
  }
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

        const volumeSliderValue =
          localStorage.getItem("volumeSliderCommandValue") || 50;
        if (typeof setVolumeSliderValue === "function")
          setVolumeSliderValue(volumeSliderValue);
      })

      .catch(() => {
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });
});
