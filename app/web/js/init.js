// =========================================//
let model = null;
let animationId = null;
let video = null;
let canvas = null;
let ctx = null;
let stream = null;

// =========================================//
// Import the COCO-SSD model from TensorFlow.js
// Load the COCO-SSD model on page load
window.addEventListener("DOMContentLoaded", function () {
  cocoSsd
    .load()
    .then(function (loadedModel) {
      model = loadedModel;
      // initSystem();
      // listAllCameras();
      document.getElementById("status").innerText = "Ready!";
      document.getElementById("theme-switch").disabled = false;
      document.getElementById("screen-switch").disabled = false;
      document.getElementById("source-switch").disabled = false;
      document.getElementById("video-source").disabled = false;
      document.getElementById("btn-start").disabled = false;
      document.getElementById("btn-stop").disabled = false;
      document.getElementById("btn-command").disabled = false;
      document.getElementById("btn-voice").disabled = false;
      document.getElementById("btn-settings").disabled = false;
      document.getElementById("btn-pause").disabled = false;
      document.getElementById("btn-capture").disabled = false;
      document.getElementById("btn-overlay1").disabled = false;
      document.getElementById("btn-overlay2").disabled = false;
      document.getElementById("btn-record").disabled = false;
      document.getElementById("btn-mute").disabled = false;
      document.getElementById("btn-unmute").disabled = false;
      document.getElementById("btn-reset").disabled = false;
      // document.getElementById("volume-slider-command").disabled = false;
      // document.getElementById("volume-slider-alert").disabled = false;
      // document.getElementById("volume-slider-status").disabled = false;
    })
    .catch(function (err) {
      document.getElementById("status").innerText = "Model load error: " + err;
    });
});

// =========================================//
function initSystem() {
  // alert("InitializeSystem");

  // Check if the browser supports getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    document.getElementById("status").innerText = "Camera access is supported.";
    // requestCameraPermission(); // Request camera permission
  } else {
    document.getElementById("status").innerText =
      "Camera access is not supported by your browser.";
    alert("Camera access is not supported by your browser.");
    return;
  }
}

// =========================================//
function requestCameraPermission() {
  // alert("RequestingCameraPermission");

  // display an alert message requesting access to the camera from web browser without playing video
  document.getElementById("status").innerText = "Requesting camera access...";
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      // If permission is granted
      // document.getElementById("status").innerText =
      //   "Camera permission granted.";
      // You can optionally stop the stream immediately if you only want permission
      stream.getTracks().forEach((track) => track.stop());
    })
    .catch(function (err) {
      // If permission is denied, show an error message
      document.getElementById("status").innerText =
        "Camera permission denied: " + err;
      alert("Camera permission denied: " + err);
    });
}

flag_videoSource0 = false; // Integrated camera
flag_videoSource1 = false; // USB camera
// =========================================//
function listAllCameras() {
  // alert("listAllCameras");

  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      if (videoInputs.length === 0) {
        alert("No cameras found.");
      } else {
        videoInputs.forEach((input) => {
          if (input.label.includes("Integrated")) {
            flag_videoSource0 = true;
            // alert("Integrated camera found: " + input.label);
          } else if (input.label.includes("USB")) {
            flag_videoSource1 = true;
            // alert("USB camera found: " + input.label);
          }
        });
      }
    })
    .catch(function (err) {
      alert("Error enumerating devices: " + err);
    });
}

// =========================================//
const btnCommand = document.getElementById("btn-command");
const btnVoice = document.getElementById("btn-voice");
const btnSettings = document.getElementById("btn-settings");
const btnHelp = document.getElementById("btn-help");
const btnTutorial = document.getElementById("btn-tutorial");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const groupFrameSource = document.getElementById("group-frame-source");
const groupFrameCommand = document.getElementById("group-frame-command");
const groupFrameVoice = document.getElementById("group-frame-voice");
const groupFrameSettings = document.getElementById("group-frame-settings");
const groupFrameTutorial = document.getElementById("group-frame-tutorial");
const groupFrameHelp = document.getElementById("group-frame-help");

// // document.getElementById("btn-command").disabled = true;
// // document.getElementById("btn-voice").disabled = true;
// // document.getElementById("btn-settings").disabled = true;
// // document.getElementById("theme-switch").disabled = false;
// // document.getElementById("screen-switch").disabled = false;
// // document.getElementById("source-switch").disabled = false;
// // document.getElementById("video-source").disabled = false;

// btnCommand.disabled = true;
// btnVoice.disabled = true;
// btnSettings.disabled = true;
// btnHelp.disabled = true;
// btnTutorial.disabled = true;
// btnStart.disabled = true;
// btnStop.disabled = true;
