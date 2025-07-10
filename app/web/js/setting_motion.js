// =========================================//
document.addEventListener("DOMContentLoaded", function () {
  const motionSwitch = document.getElementById("motion-switch");
  if (!motionSwitch) return;

  // Set the switch state from localStorage
  motionSwitch.checked = localStorage.getItem("motionMode") === "on";

  // Add event listener
  motionSwitch.addEventListener("change", toggleMotionDetection);
});

// =========================================//
function toggleMotionDetection() {
  // alert("toggleMotionDetection");

  const motionSwitch = document.getElementById("motion-switch");

  if (window.voiceStatusEnabled) {
    playVoiceStatus(
      "Motion Detection " + (motionSwitch.checked ? "On" : "Off")
    );
  }

  if (motionSwitch) {
    localStorage.setItem("motionMode", motionSwitch.checked ? "on" : "off");
  }
}

// =========================================//
function setMotionDetectionMode(mode) {
  // alert("setMotionDetectionMode: " + mode);

  const motionSwitch = document.getElementById("motion-switch");
  if (motionSwitch) {
    motionSwitch.checked = mode === "on";
    motionSwitch.dispatchEvent(new Event("change"));
  }
}
