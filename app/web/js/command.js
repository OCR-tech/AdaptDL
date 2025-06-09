// =========================================//
function playVideo() {
  document.getElementById("status").innerText = "Play";
}

// =========================================//
// Capture image functions
function captureImage() {
  document.getElementById("status").innerText = "Capture Image";
}

// =========================================//
// Capture image with boxes function
function captureImageWithBoxes() {
  document.getElementById("status").innerText = "Capture Image with Boxes";
}

// =========================================//
// Video control functions
function pauseVideo() {
  document.getElementById("status").innerText = "Pause";
}

// =========================================//
function resumeVideo() {
  document.getElementById("status").innerText = "Resume";
}

// =========================================//
function saveVideo() {
  document.getElementById("status").innerText = "Save";
}

// =========================================//
function recordVideo() {
  document.getElementById("status").innerText = "Record";
}

// =========================================//
function history() {
  document.getElementById("status").innerText = "History";
}

// =========================================//
function exit() {
  window.close();
  // document.getElementById("status").innerText = "Exit";
  // if (confirm("Are you sure you want to exit?")) {
  //   window.close();
  // } else {
  //   document.getElementById("status").innerText = "Exit cancelled.";
  // }
}
