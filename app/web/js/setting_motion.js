// =========================================//
function toggleMotionDetection() {
  // alert("toggleMotionDetection");

  const motionSwitch = document.getElementById("motion-switch");
  const motionSensitivitySlider = document.getElementById(
    "motion-sensitivity-slider"
  );

  if (!motionSwitch || !motionSensitivitySlider) return;

  if (window.voiceStatusEnabled) {
    playVoiceStatus(
      "Motion Detection " + (motionSwitch.checked ? "On" : "Off")
    );
  }

  // Enable/disable motion sensitivity slider based on motion detection switch
  motionSensitivitySlider.disabled = !motionSwitch.checked;

  // Save motion detection mode and sensitivity to localStorage
  localStorage.setItem(
    "motionDetectionMode",
    motionSwitch.checked ? "on" : "off"
  );
  localStorage.setItem("motionSensitivity", motionSensitivitySlider.value);
}

// =========================================//
function updateMotionSensitivity(val) {
  const slider = document.getElementById("motion-sensitivity-slider");
  if (slider) {
    slider.value = val;
  }

  // Change the motion detection sensitivity based on the slider value
  window.motionSensitivity = Math.max(1, Math.min(100, val));
  localStorage.setItem("motionSensitivity", window.motionSensitivity);
}

// =========================================//
function setMotionDetectionMode(mode) {
  // alert("setMotionDetectionMode: " + mode);

  const motionSwitch = document.getElementById("motion-switch");
  const motionSensitivitySlider = document.getElementById(
    "motion-sensitivity-slider"
  );

  if (motionSwitch && motionSensitivitySlider) {
    // Set the switch state
    motionSwitch.checked = mode === "on";
    motionSwitch.dispatchEvent(new Event("change"));
    // Set the sensitivity slider enabled/disabled based on motion detection state
    motionSensitivitySlider.disabled = mode !== "on";
    // Set the sensitivity value
    const sensitivityValue = localStorage.getItem("motionSensitivity") || 30;
    motionSensitivitySlider.value = sensitivityValue;
  }
}

// =========================================//
function setMotionSensitivity(value) {
  const motionSensitivitySlider = document.getElementById(
    "motion-sensitivity-slider"
  );
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
