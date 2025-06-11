// =========================================//
// Switch button logic
const themeSwitch = document.getElementById("theme-switch");
const themeModeText = document.getElementById("theme-mode-text");
themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    setTheme("dark");
    themeModeText.textContent = "Dark";
  } else {
    setTheme("light");
    themeModeText.textContent = "Light";
  }
});

// =========================================//
// Button controls for Command, Voice, and Settings
const btnCommand = document.getElementById("btn-command");
const btnVoice = document.getElementById("btn-voice");
const btnSettings = document.getElementById("btn-settings");

// =========================================//
// Set initial theme based on system preference
function setTheme(mode) {
  const body = document.body;
  const container = document.getElementById("container");
  const groupFrame = document.getElementById("group-frame");
  const videoFeed = document.getElementById("video-feed");
  const controlsButtons = document.querySelectorAll(".controls-section button");
  const selects = document.querySelectorAll(".video_source_section select");
  const themeModeText = document.getElementById("theme-mode-text");

  if (mode === "dark") {
    body.classList.add("dark-mode");
    container.classList.add("dark-mode");
    groupFrame.classList.add("dark-mode");
    videoFeed.classList.add("dark-mode");
    selects.forEach((sel) => sel.classList.add("dark-mode"));
    controlsButtons.forEach((btn) => btn.classList.add("dark-mode"));
  } else {
    body.classList.remove("dark-mode");
    container.classList.remove("dark-mode");
    groupFrame.classList.remove("dark-mode");
    videoFeed.classList.remove("dark-mode");
    selects.forEach((sel) => sel.classList.remove("dark-mode"));
    controlsButtons.forEach((btn) => btn.classList.remove("dark-mode"));
  }
}

// =========================================//
function showCommand() {
  document.getElementById("status").innerText = "Command Control";
}

btnCommand.addEventListener("click", () => {
  btnCommand.classList.toggle("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  if (btnCommand.classList.contains("active")) {
    const groupFrame1 = document.getElementById("group-frame1");
    const groupFrame2 = document.getElementById("group-frame2");
    const groupFrame3 = document.getElementById("group-frame3");
    groupFrame1.style.display = "flex";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
  } else {
    const groupFrame1 = document.getElementById("group-frame1");
    const groupFrame2 = document.getElementById("group-frame2");
    const groupFrame3 = document.getElementById("group-frame3");
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
  }
});

// =========================================//
// Show VoiceControl function
function showVoice() {
  document.getElementById("status").innerText = "Voice Control";
}

btnVoice.addEventListener("click", () => {
  btnCommand.classList.remove("active");
  btnVoice.classList.toggle("active");
  btnSettings.classList.remove("active");

  if (btnVoice.classList.contains("active")) {
    const groupFrame1 = document.getElementById("group-frame1");
    const groupFrame2 = document.getElementById("group-frame2");
    const groupFrame3 = document.getElementById("group-frame3");
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "flex";
    groupFrame3.style.display = "none";
  } else {
    const groupFrame1 = document.getElementById("group-frame1");
    const groupFrame2 = document.getElementById("group-frame2");
    const groupFrame3 = document.getElementById("group-frame3");
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
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
    const groupFrame1 = document.getElementById("group-frame1");
    const groupFrame2 = document.getElementById("group-frame2");
    const groupFrame3 = document.getElementById("group-frame3");
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "flex";

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
    const groupFrame1 = document.getElementById("group-frame1");
    const groupFrame2 = document.getElementById("group-frame2");
    const groupFrame3 = document.getElementById("group-frame3");
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
  }
});

// =========================================//
// Spinbox control function
function setSpinboxValue() {
  const spinboxValue = document.getElementById("spinbox").value;
  document.getElementById("status").innerText =
    "Spinbox value set to: " + spinboxValue;
  // Here you would typically send the value to the backend
}

// =========================================//
// Mute function
// function mute() {
//   document.getElementById("status").innerText = "Mute";
// }

// =========================================//
// Optional: Prevent spinbox from going out of bounds
document.getElementById("spinbox").addEventListener("change", function () {
  let val = parseInt(this.value, 10);
  if (isNaN(val) || val < 0) this.value = 0;
  if (val > 100) this.value = 100;
});
