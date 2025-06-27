// =========================================//
function startButton() {
  // alert("StartButton");

  // document.getElementById("status").innerText = "Start";
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-stop").style.display = "inline-block";

  const videoSource = document.getElementById("video-source").value;

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

  // displayDateTime();
}

// =========================================//
function stopButton() {
  const placeholder = document.getElementById("video-placeholder");
  const btnOk = document.getElementById("btn-ok");
  // const videoSourceStatus = document.getElementById("video-source");

  document.getElementById("btn-start").style.display = "inline-block";
  document.getElementById("btn-stop").style.display = "none";
  document.getElementById("status").innerText = "Stopped";

  // Set all buttons to inactive
  // btnCommand.classList.remove("active");
  // btnVoice.classList.remove("active");
  // btnSettings.classList.remove("active");
  btnOk.disabled = false; // Disable the OK button after setting the URL
  document.getElementById("video-source").disabled = false;

  // Stop calling fetchAndDetect() if used
  if (typeof fetchAndDetect === "function") {
    fetchAndDetect = null;
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (video) {
    video.pause();
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    video.remove();
    video = null;
  }
  if (canvas) {
    canvas.remove();
    canvas = null;
  }

  if (placeholder) placeholder.style.display = "block";
}

// =========================================//
function showCommand() {
  document.getElementById("status").innerText = "Command";
}

btnCommand.addEventListener("click", () => {
  btnCommand.classList.toggle("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  if (btnCommand.classList.contains("active")) {
    groupFrame2.style.display = "flex";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  } else {
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  }
});

// =========================================//
// Show VoiceControl function
function showVoice() {
  document.getElementById("status").innerText = "Voice";
}

btnVoice.addEventListener("click", () => {
  btnCommand.classList.remove("active");
  btnVoice.classList.toggle("active");
  btnSettings.classList.remove("active");

  if (btnVoice.classList.contains("active")) {
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "flex";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  } else {
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  }
});

// =========================================//
// Show Settings function
function showSettings() {
  document.getElementById("status").innerText = "Settings";
}

btnSettings.addEventListener("click", () => {
  btnCommand.classList.remove("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.toggle("active");

  if (btnSettings.classList.contains("active")) {
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "flex";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";

    const videoSource = document.getElementById("video-source").value;
    const btnOk = document.getElementById("btn-ok");
    const ipCameraUrlInput = document.getElementById("ip-camera-url");
    if (
      videoSource === "camera" ||
      videoSource === "webcam" ||
      videoSource === "video_file"
    ) {
      btnOk.style.display = "none"; // Hide the OK button
      ipCameraUrlInput.style.display = "none"; // Hide the IP camera URL input
      // document.getElementById("btn-ok").style.display = "none";
      // document.getElementById("ip-camera-url").style.display = "none";
    }
  } else {
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  }
});

// =========================================//
// Spinbox control function
// function setSpinboxValue() {
//   const spinboxValue = document.getElementById("spinbox").value;
//   document.getElementById("status").innerText =
//     "Spinbox value set to: " + spinboxValue;
//   // Here you would typically send the value to the backend
// }

// =========================================//
// Mute function
// function mute() {
//   document.getElementById("status").innerText = "Mute";
// }

// =========================================//
// Optional: Prevent spinbox from going out of bounds
// document.getElementById("spinbox").addEventListener("change", function () {
//   let val = parseInt(this.value, 10);
//   if (isNaN(val) || val < 0) this.value = 0;
//   if (val > 100) this.value = 100;
// });

// =========================================//
function showTutorial() {
  document.getElementById("status").innerText = "Tutorial";

  btnCommand.classList.remove("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  // show the tutorial content
  groupFrame2.style.display = "none";
  groupFrame3.style.display = "none";
  groupFrame4.style.display = "none";
  groupFrame5.style.display = "flex";
  groupFrame6.style.display = "none";

  // move the cursor to the tutorial section
  document
    .getElementById("group-frame4")
    .scrollIntoView({ behavior: "smooth" });
}

// =========================================//
function HideTutorial() {
  document.getElementById("status").innerText = "Ready!";
  groupFrame2.style.display = "none";
  groupFrame3.style.display = "none";
  groupFrame4.style.display = "none";
  groupFrame5.style.display = "none";
  groupFrame6.style.display = "none";
}

// =========================================//
function showHelp() {
  document.getElementById("status").innerText = "Help";

  btnCommand.classList.remove("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  groupFrame2.style.display = "none";
  groupFrame3.style.display = "none";
  groupFrame4.style.display = "none";
  groupFrame5.style.display = "none";
  groupFrame6.style.display = "flex";

  // move the cursor to the help section
  document
    .getElementById("group-frame5")
    .scrollIntoView({ behavior: "smooth" });
}

// =========================================//
function HideHelp() {
  document.getElementById("status").innerText = "Ready!";
  groupFrame2.style.display = "none";
  groupFrame3.style.display = "none";
  groupFrame4.style.display = "none";
  groupFrame5.style.display = "none";
  groupFrame6.style.display = "none";
}
