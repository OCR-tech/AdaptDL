// =========================================//
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[include-html]").forEach(function (el) {
    const file = el.getAttribute("include-html");
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;

        //==========================================//
        // Attach handler after include
        if (el.id === "group-frame-source") {
          const selectVideo = el.querySelector("#video-source");
          const selectUnit = el.querySelector("#video-unit");

          if (selectVideo && typeof updateVideoSource === "function") {
            selectVideo.onchange = updateVideoSource;
          }
          if (selectUnit && typeof updateVideoUnit === "function") {
            selectUnit.onchange = updateVideoUnit;
          }
        }

        //==================== Video Unit ======================//
        window.voiceAlertEnabled = true;
        window.notificationEnabled = true;
        window.showDateTimeOverlay = true;
        window.showGPSLocation = true;

        //==========================================//
        // source mode
        const sourceMode = localStorage.getItem("sourceMode") || "off";
        if (typeof setSourceMode === "function") setSourceMode(sourceMode);

        //==========================================//
        // theme mode
        const savedTheme = localStorage.getItem("theme") || "light";
        if (typeof setTheme === "function") setTheme(savedTheme);

        //==========================================//
        // voice command
        const voiceCommandMode =
          localStorage.getItem("voiceCommandMode") || "off";
        if (typeof setVoiceCommandMode === "function")
          setVoiceCommandMode(voiceCommandMode);

        const volumeSliderCommandValue =
          localStorage.getItem("volumeSliderCommandValue") || 50;
        if (typeof setVolumeSliderCommandValue === "function")
          setVolumeSliderCommandValue(volumeSliderCommandValue);

        //==========================================//
        // voice alert
        const voiceAlertMode = localStorage.getItem("voiceAlertMode") || "off";
        if (typeof setVoiceAlertMode === "function")
          setVoiceAlertMode(voiceAlertMode);

        const volumeSliderAlertValue =
          localStorage.getItem("volumeSliderAlertValue") || 50;
        if (typeof setVolumeSliderAlertValue === "function")
          setVolumeSliderAlertValue(volumeSliderAlertValue);

        //==========================================//
        // voice status
        const voiceStatusMode =
          localStorage.getItem("voiceStatusMode") || "off";
        if (typeof setVoiceStatusMode === "function")
          setVoiceStatusMode(voiceStatusMode);

        const volumeSliderStatusValue =
          localStorage.getItem("volumeSliderStatusValue") || 50;
        if (typeof setVolumeSliderStatusValue === "function")
          setVolumeSliderStatusValue(volumeSliderStatusValue);

        //==========================================//
        // Datetime mode
        const datetimeMode = localStorage.getItem("datetimeMode") || "off";
        if (typeof setDatetimeMode === "function")
          setDatetimeMode(datetimeMode);

        //==========================================//
        // GPS Location mode
        const gpsLocationMode =
          localStorage.getItem("gpsLocationMode") || "off";
        if (typeof setGPSLocationMode === "function")
          setGPSLocationMode(gpsLocationMode);

        //==========================================//
        // Notification mode
        const notificationMode =
          localStorage.getItem("notificationMode") || "off";
        if (typeof setNotificationMode === "function")
          setNotificationMode(notificationMode);

        //==========================================//
      })
      .catch(() => {
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });
});
