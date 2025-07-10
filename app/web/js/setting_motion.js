// =========================================//
document.addEventListener("DOMContentLoaded", function () {
  const motionSwitch = document.getElementById("motion-switch");
  const motionSensitivitySlider = document.getElementById("motion-sensitivity");
  if (!motionSwitch) return;

  // Set the switch state from localStorage
  motionSwitch.checked = localStorage.getItem("motionMode") === "on";

  // Set initial overlay state
  window.motionDetectionEnabled = motionSwitch.checked;

  // Set initial sensitivity value
  const initialSensitivity = localStorage.getItem("motionSensitivity") || 30;
  setMotionSensitivity(initialSensitivity);

  // Add event listener
  motionSwitch.addEventListener("change", toggleMotionDetection);
});

// =========================================//
function toggleMotionDetection() {
  // alert("toggleMotionDetection");

  const motionSwitch = document.getElementById("motion-switch");
  const motionSensitivitySlider = document.getElementById("motion-sensitivity");
  if (!motionSwitch || !motionSensitivitySlider) return;

  if (window.voiceStatusEnabled) {
    playVoiceStatus(
      "Motion Detection " + (motionSwitch.checked ? "On" : "Off")
    );
  }

  if (motionSwitch) {
    window.motionDetectionEnabled = motionSwitch.checked;
    // Set the sensitivity slider enabled/disabled based on motion detection state
    motionSensitivitySlider.disabled = !motionSwitch.checked;
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

// =========================================//
function setMotionSensitivity(value) {
  const motionSensitivitySlider = document.getElementById("motion-sensitivity");
  if (!motionSensitivitySlider) return;

  // Set the slider value
  motionSensitivitySlider.value = value;

  // Optionally trigger input event if needed
  motionSensitivitySlider.dispatchEvent(new Event("input"));

  // Save to localStorage
  localStorage.setItem("motionSensitivity", value);
}

// =========================================//
// Basic object motion detection function
function detectObjectMotion(
  prevFrame,
  currFrame,
  width,
  height,
  threshold = 30
) {
  // prevFrame and currFrame are Uint8ClampedArray (from canvas ImageData.data)
  // Returns true if motion is detected, false otherwise

  let motionPixels = 0;
  const totalPixels = width * height;

  for (let i = 0; i < totalPixels * 4; i += 4) {
    // Calculate grayscale difference for each pixel

    const prevGray =
      0.299 * prevFrame[i] +
      0.587 * prevFrame[i + 1] +
      0.114 * prevFrame[i + 2];
    const currGray =
      0.299 * currFrame[i] +
      0.587 * currFrame[i + 1] +
      0.114 * currFrame[i + 2];
    if (Math.abs(currGray - prevGray) > threshold) {
      motionPixels++;
    }
  }

  // If more than 2% of pixels have changed, consider it motion
  return motionPixels / totalPixels > 0.02;
}
