// Attach event listener (call this after DOM is loaded)
document.addEventListener("DOMContentLoaded", function () {
  const streamSwitch = document.getElementById("stream-switch");
  if (streamSwitch) {
    streamSwitch.addEventListener("change", toggleStreamMode);
  }
});

// Stream mode toggle for streaming video
function toggleStreamMode() {
  // alert("Toggle Stream Mode");

  const streamSwitch = document.getElementById("stream-switch");
  const streamVideo = document.getElementById("stream-video");
  const streamStatus = document.getElementById("stream-status");

  if (!streamSwitch || !streamVideo) return;

  if (streamSwitch.checked) {
    // Enable stream mode: show video, start stream
    streamVideo.style.display = "block";
    if (streamStatus) streamStatus.textContent = "Streaming enabled";
    // Example: set video src to your stream URL
    streamVideo.src = "your_stream_url_here"; // Replace with actual stream URL
    streamVideo.play();
  } else {
    // Disable stream mode: hide video, stop stream
    streamVideo.pause();
    streamVideo.src = "";
    streamVideo.style.display = "none";
    if (streamStatus) streamStatus.textContent = "Streaming disabled";
  }
}
