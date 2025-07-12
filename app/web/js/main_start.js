// =========================================//
function startButton() {
  // alert("StartButton");

  // document.getElementById("status").innerText = "Start";
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-stop").style.display = "inline-block";

  const videoSource = document.getElementById("video-source").value;

  window.runDetectionLoop = true; // Start the detection loop
  window.voiceAlertEnabled = true;
  window.notificationEnabled = true;

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
}
