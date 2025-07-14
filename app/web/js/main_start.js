// =========================================//
function startButton() {
  // alert("StartButton");
  stopCamera();

  // document.getElementById("status").innerText = "Start";
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-stop").style.display = "inline-block";

  const videoSource = document.getElementById("video-source").value;

  // ==============================//
  window.runDetectionLoop = true; // Start the detection loop
  window.voiceAlertEnabled = true;
  window.notificationEnabled = true;
  window.motionDetectionEnabled = true;
  window.fireDetectionEnabled = true;

  if (window.voiceStatusEnabled) {
    playVoiceStatus("Start");
    // playVoiceStatus("Start, Detecting...");
  }

  // Check Video source selection
  if (videoSource === "camera") {
    startIntegratedCamera();
  } else if (videoSource === "camera_usb") {
    startUSBCamera();
  } else if (videoSource === "camera_ip") {
    okSourceCamera();
    // startIPCamera();
  } else if (videoSource === "stream") {
    startStream();
  } else if (videoSource === "video") {
    startVideo(window.selectedVideoFilePath);
  }

  // Update video size display with current size in Settings
  // updateLabelSettings();
  // updateFramerateLabel();
}

// ==============================//
function updateLabelSettings() {
  const video =
    document.getElementById("video") ||
    document.getElementById("camera-stream") ||
    document.getElementById("usb-camera-stream") ||
    document.querySelector("video");
  const label = document.getElementById("video-size-label");

  // alert("video" + video);

  if (!video || !label) return;

  label.textContent = `Video Size: ${video.videoWidth} x ${video.videoHeight}`;
  label.style.display = "inline-block";
}
