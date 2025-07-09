// =========================================//
function startButton() {
  // alert("StartButton");

  // document.getElementById("status").innerText = "Start";
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-stop").style.display = "inline-block";

  const videoSource = document.getElementById("video-source").value;

  window.voiceAlertEnabled = true;
  window.notificationEnabled = true;

  // alert("123" + window.voiceAlertEnabled + window.notificationEnabled);

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

  // displayDateTime();
}

// =========================================//
function stopButton() {
  // alert("StopButton");

  const placeholder = document.getElementById("video-placeholder");
  const btnOk = document.getElementById("btn-ok");
  // const videoSourceStatus = document.getElementById("video-source");

  document.getElementById("btn-start").style.display = "inline-block";
  document.getElementById("btn-stop").style.display = "none";
  document.getElementById("status").innerText = "Stopped";
  document.getElementById("video-source").disabled = false;

  if (window.voiceStatusEnabled) {
    playVoiceStatus("Stopped");
  }

  // Set all buttons to inactive
  // btnCommand.classList.remove("active");
  // btnVoice.classList.remove("active");
  // btnSettings.classList.remove("active");
  btnOk.disabled = false; // Disable the OK button after setting the URL

  // Stop calling playVoiceAlert()
  window.voiceAlertEnabled = false;
  // window.speechSynthesis.cancel();

  window.notificationEnabled = false;

  // alert("123" + window.voiceAlertEnabled + window.notificationEnabled);

  // Stop calling detectFrame()

  // Stop calling fetchAndDetect()

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
// Store the selection status of a command button in localStorage
function saveButtonStatus(buttonId, isActive) {
  localStorage.setItem(
    `btnStatus_${buttonId}`,
    isActive ? "active" : "inactive"
  );
}

// Retrieve the selection status of a command button from localStorage
function getButtonStatus(buttonId) {
  return localStorage.getItem(`btnStatus_${buttonId}`) === "active";
}

// Restore button status on startup
document.addEventListener("DOMContentLoaded", function () {
  const buttons = [
    { btn: btnCommand, group: groupFrameCommand },
    { btn: btnVoice, group: groupFrameVoice },
    { btn: btnSettings, group: groupFrameSettings },
    // Add more buttons/groups as needed
  ];

  buttons.forEach(({ btn, group }) => {
    if (btn && getButtonStatus(btn.id)) {
      btn.classList.add("active");
      if (group) group.style.display = "flex";
    } else {
      btn.classList.remove("active");
      if (group) group.style.display = "none";
    }
  });
});

// =========================================//
function showCommand() {
  document.getElementById("status").innerText = "Command";
}

btnCommand.addEventListener("click", () => {
  btnCommand.classList.toggle("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  if (btnCommand.classList.contains("active")) {
    groupFrameCommand.style.display = "flex";
    groupFrameVoice.style.display = "none";
    groupFrameSettings.style.display = "none";
    groupFrameTutorial.style.display = "none";
    groupFrameHelp.style.display = "none";
  } else {
    groupFrameCommand.style.display = "none";
    groupFrameVoice.style.display = "none";
    groupFrameSettings.style.display = "none";
    groupFrameTutorial.style.display = "none";
    groupFrameHelp.style.display = "none";
  }

  // Save status for all buttons
  saveButtonStatus(btnCommand.id, btnCommand.classList.contains("active"));
  saveButtonStatus(btnVoice.id, btnVoice.classList.contains("active"));
  saveButtonStatus(btnSettings.id, btnSettings.classList.contains("active"));
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
    groupFrameCommand.style.display = "none";
    groupFrameVoice.style.display = "flex";
    groupFrameSettings.style.display = "none";
    groupFrameTutorial.style.display = "none";
    groupFrameHelp.style.display = "none";
  } else {
    groupFrameCommand.style.display = "none";
    groupFrameVoice.style.display = "none";
    groupFrameSettings.style.display = "none";
    groupFrameTutorial.style.display = "none";
    groupFrameHelp.style.display = "none";
  }
  saveButtonStatus(btnCommand.id, btnCommand.classList.contains("active"));
  saveButtonStatus(btnVoice.id, btnVoice.classList.contains("active"));
  saveButtonStatus(btnSettings.id, btnSettings.classList.contains("active"));
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
    groupFrameCommand.style.display = "none";
    groupFrameVoice.style.display = "none";
    groupFrameSettings.style.display = "flex";
    groupFrameTutorial.style.display = "none";
    groupFrameHelp.style.display = "none";

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
    groupFrameCommand.style.display = "none";
    groupFrameVoice.style.display = "none";
    groupFrameSettings.style.display = "none";
    groupFrameTutorial.style.display = "none";
    groupFrameHelp.style.display = "none";
  }
  saveButtonStatus(btnCommand.id, btnCommand.classList.contains("active"));
  saveButtonStatus(btnVoice.id, btnVoice.classList.contains("active"));
  saveButtonStatus(btnSettings.id, btnSettings.classList.contains("active"));
});

// =========================================//
function showTutorial() {
  document.getElementById("status").innerText = "Tutorial";

  btnCommand.classList.remove("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  // show the tutorial content
  groupFrameCommand.style.display = "none";
  groupFrameVoice.style.display = "none";
  groupFrameSettings.style.display = "none";
  groupFrameTutorial.style.display = "flex";
  groupFrameHelp.style.display = "none";

  // move the cursor to the tutorial section
  document
    .getElementById("group-frame-tutorial")
    .scrollIntoView({ behavior: "smooth" });
}

// =========================================//
function HideTutorial() {
  document.getElementById("status").innerText = "Ready!";
  groupFrameCommand.style.display = "none";
  groupFrameVoice.style.display = "none";
  groupFrameSettings.style.display = "none";
  groupFrameTutorial.style.display = "none";
  groupFrameHelp.style.display = "none";
}

// =========================================//
function showHelp() {
  document.getElementById("status").innerText = "Help";

  btnCommand.classList.remove("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  groupFrameCommand.style.display = "none";
  groupFrameVoice.style.display = "none";
  groupFrameSettings.style.display = "none";
  groupFrameTutorial.style.display = "none";
  groupFrameHelp.style.display = "flex";

  // move the cursor to the help section
  document
    .getElementById("group-frame-help")
    .scrollIntoView({ behavior: "smooth" });
}

// =========================================//
function HideHelp() {
  document.getElementById("status").innerText = "Ready!";
  groupFrameCommand.style.display = "none";
  groupFrameVoice.style.display = "none";
  groupFrameSettings.style.display = "none";
  groupFrameTutorial.style.display = "none";
  groupFrameHelp.style.display = "none";
}
