// =========================================//
// Video resolution selection
function selectVideoResolution() {
  const videoResolution = document.getElementById("video-resolution").value;
  document.getElementById("status").innerText =
    "Video resolution set to: " + videoResolution;
  // Here you would typically send the selected resolution to the backend
}

// =========================================//
// Video frame rate selection
function selectVideoFrameRate() {
  const videoFrameRate = document.getElementById("video-frame-rate").value;
  document.getElementById("status").innerText =
    "Video frame rate set to: " + videoFrameRate;
  // Here you would typically send the selected frame rate to the backend
}
