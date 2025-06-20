// =========================================//
// Theme logic for all pages
document.addEventListener("DOMContentLoaded", function () {
  // Always apply saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // After loading content into group-frame1
  const groupFrame1 = document.getElementById("group-frame1");
  if (groupFrame1) {
    if (savedTheme === "dark") {
      groupFrame1.classList.add("dark-mode");
    } else {
      groupFrame1.classList.remove("dark-mode");
    }
  }

  // Only add switch logic if the switch exists
  const themeSwitch = document.getElementById("theme-switch");
  const themeModeText = document.getElementById("theme-mode-text");
  if (themeSwitch && themeModeText) {
    themeSwitch.checked = savedTheme === "dark";
    themeModeText.textContent = savedTheme === "dark" ? "Theme" : "Theme";
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        setTheme("dark");
        // themeModeText.textContent = "Dark";
        localStorage.setItem("theme", "dark");
      } else {
        setTheme("light");
        // themeModeText.textContent = "Light";
        localStorage.setItem("theme", "light");
      }
    });
  }
});

// =========================================//
// Set initial theme based on system preference
function setTheme(mode) {
  const body = document.body;
  const container = document.getElementById("container");
  const groupFrame = document.getElementById("group-frame");
  const videoFeed = document.getElementById("video-feed");
  const controlsButtons = document.querySelectorAll(".controls-section button");
  const selects = document.querySelectorAll(".video_source_section select");
  // const themeModeText = document.getElementById("theme-mode-text");
  const groupFrame1 = document.getElementById("group-frame1");

  if (mode === "dark") {
    body.classList.add("dark-mode");
    if (container) container.classList.add("dark-mode");
    if (groupFrame) groupFrame.classList.add("dark-mode");
    if (videoFeed) videoFeed.classList.add("dark-mode");
    if (groupFrame1) groupFrame1.classList.add("dark-mode");
    selects.forEach((sel) => sel.classList.add("dark-mode"));
    controlsButtons.forEach((btn) => btn.classList.add("dark-mode"));
    // if (themeModeText) themeModeText.textContent = "Dark";
  } else {
    body.classList.remove("dark-mode");
    if (container) container.classList.remove("dark-mode");
    if (groupFrame) groupFrame.classList.remove("dark-mode");
    if (videoFeed) videoFeed.classList.remove("dark-mode");
    if (groupFrame1) groupFrame1.classList.remove("dark-mode");
    selects.forEach((sel) => sel.classList.remove("dark-mode"));
    controlsButtons.forEach((btn) => btn.classList.remove("dark-mode"));
    // if (themeModeText) themeModeText.textContent = "Light";
  }
}
