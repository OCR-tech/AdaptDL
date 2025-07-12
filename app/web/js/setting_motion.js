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
function updateMotionDetection() {
  // alert("updateMotionDetection");

  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  if (!canvas || !video) return;

  // Ensure canvas size matches video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const currFrame = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  window.prevFrame = window.currFrame || currFrame;
  window.currFrame = currFrame;

  const threshold = parseInt(localStorage.getItem("motionSensitivity")) || 30;

  const motionDetected = detectObjectMotion(
    window.prevFrame,
    window.currFrame,
    canvas.width,
    canvas.height,
    threshold
  );

  if (motionDetected) {
    document.getElementById("status").innerText = "Motion detected!";
  } else {
    document.getElementById("status").innerText = "No motion.";
  }
}

// =========================================//
function detectObjectMotion(
  prevFrame,
  currFrame,
  width,
  height,
  threshold = 30
) {
  alert("detectObjectMotion called");
  if (!prevFrame || !currFrame) return false;

  let motionPixels = 0;
  const totalPixels = width * height;

  for (let i = 0; i < totalPixels * 4; i += 4) {
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

  return motionPixels / totalPixels > 0.02;
}

// Start the detection loop
setInterval(updateMotionDetection, 200);
