// =========================================//
// Button controls for Command, Voice, and Settings
const btnCommand = document.getElementById("btn-command");
const btnVoice = document.getElementById("btn-voice");
const btnSettings = document.getElementById("btn-settings");
const btnHelp = document.getElementById("btn-help");
const btnTutorial = document.getElementById("btn-tutorial");

const groupFrame1 = document.getElementById("group-frame1");
const groupFrame2 = document.getElementById("group-frame2");
const groupFrame3 = document.getElementById("group-frame3");
const groupFrame4 = document.getElementById("group-frame4");
const groupFrame5 = document.getElementById("group-frame5");
const groupFrame6 = document.getElementById("group-frame6");

// =========================================//
function showCommand() {
  document.getElementById("status").innerText = "Command";
}

btnCommand.addEventListener("click", () => {
  btnCommand.classList.toggle("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  if (btnCommand.classList.contains("active")) {
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "flex";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  } else {
    groupFrame1.style.display = "none";
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
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "flex";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
  } else {
    groupFrame1.style.display = "none";
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
    groupFrame1.style.display = "none";
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
    groupFrame1.style.display = "none";
    groupFrame2.style.display = "none";
    groupFrame3.style.display = "none";
    groupFrame4.style.display = "none";
    groupFrame5.style.display = "none";
    groupFrame6.style.display = "none";
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

// =========================================//
function showTutorial() {
  document.getElementById("status").innerText = "Tutorial";

  btnCommand.classList.remove("active");
  btnVoice.classList.remove("active");
  btnSettings.classList.remove("active");

  // show the tutorial content
  groupFrame1.style.display = "none";
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
  groupFrame1.style.display = "none";
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

  groupFrame1.style.display = "none";
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
  groupFrame1.style.display = "none";
  groupFrame2.style.display = "none";
  groupFrame3.style.display = "none";
  groupFrame4.style.display = "none";
  groupFrame5.style.display = "none";
  groupFrame6.style.display = "none";
}
