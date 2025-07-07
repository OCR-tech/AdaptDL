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

        //==========================================//
        // Re-apply source mode
        const sourceMode = localStorage.getItem("sourceMode") || "off";
        if (typeof setSourceMode === "function") setSourceMode(sourceMode);

        //==========================================//
        // Re-apply theme mode
        const savedTheme = localStorage.getItem("theme") || "light";
        if (typeof setTheme === "function") setTheme(savedTheme);

        //==========================================//
        // Re-apply voice command
        const voiceCommandMode =
          localStorage.getItem("voiceCommandMode") || "off";
        if (typeof setVoiceCommandMode === "function")
          setVoiceCommandMode(voiceCommandMode);

        const volumeSliderCommandValue =
          localStorage.getItem("volumeSliderCommandValue") || 50;
        if (typeof setVolumeSliderCommandValue === "function")
          setVolumeSliderCommandValue(volumeSliderCommandValue);

        //==========================================//
        // Re-apply voice alert
        const voiceAlertMode = localStorage.getItem("voiceAlertMode") || "off";
        if (typeof setVoiceAlertMode === "function")
          setVoiceAlertMode(voiceAlertMode);

        const volumeSliderAlertValue =
          localStorage.getItem("volumeSliderAlertValue") || 50;
        if (typeof setVolumeSliderAlertValue === "function")
          setVolumeSliderAlertValue(volumeSliderAlertValue);

        //==========================================//
        // Re-apply voice status
        const voiceStatusMode =
          localStorage.getItem("voiceStatusMode") || "off";
        if (typeof setVoiceStatusMode === "function")
          setVoiceStatusMode(voiceStatusMode);

        const volumeSliderStatusValue =
          localStorage.getItem("volumeSliderStatusValue") || 50;
        if (typeof setVolumeSliderStatusValue === "function")
          setVolumeSliderStatusValue(volumeSliderStatusValue);
      })

      .catch(() => {
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });
});
