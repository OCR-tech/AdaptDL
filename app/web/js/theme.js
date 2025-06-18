// // =========================================//
// // Switch button logic
// const themeSwitch = document.getElementById("theme-switch");
// const themeModeText = document.getElementById("theme-mode-text");
// themeSwitch.addEventListener("change", function () {
//   if (this.checked) {
//     setTheme("dark");
//     themeModeText.textContent = "Dark";
//   } else {
//     setTheme("light");
//     themeModeText.textContent = "Light";
//   }
// });

// =========================================//
// Theme logic for all pages
document.addEventListener("DOMContentLoaded", function () {
  // Always apply saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Only add switch logic if the switch exists
  const themeSwitch = document.getElementById("theme-switch");
  const themeModeText = document.getElementById("theme-mode-text");
  if (themeSwitch && themeModeText) {
    themeSwitch.checked = savedTheme === "dark";
    themeModeText.textContent = savedTheme === "dark" ? "Dark" : "Light";
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        setTheme("dark");
        themeModeText.textContent = "Dark";
        localStorage.setItem("theme", "dark");
      } else {
        setTheme("light");
        themeModeText.textContent = "Light";
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
  const themeModeText = document.getElementById("theme-mode-text");

  if (mode === "dark") {
    body.classList.add("dark-mode");
    if (container) container.classList.add("dark-mode");
    if (groupFrame) groupFrame.classList.add("dark-mode");
    if (videoFeed) videoFeed.classList.add("dark-mode");
    selects.forEach((sel) => sel.classList.add("dark-mode"));
    controlsButtons.forEach((btn) => btn.classList.add("dark-mode"));
    if (themeModeText) themeModeText.textContent = "Dark";
  } else {
    body.classList.remove("dark-mode");
    if (container) container.classList.remove("dark-mode");
    if (groupFrame) groupFrame.classList.remove("dark-mode");
    if (videoFeed) videoFeed.classList.remove("dark-mode");
    selects.forEach((sel) => sel.classList.remove("dark-mode"));
    controlsButtons.forEach((btn) => btn.classList.remove("dark-mode"));
    if (themeModeText) themeModeText.textContent = "Light";
  }
}

// // =========================================//
// Switch button logic
document.addEventListener("DOMContentLoaded", function () {
  const themeSwitch = document.getElementById("theme-switch");
  if (themeSwitch) {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-theme", savedTheme === "dark");
    document.body.classList.toggle("light-theme", savedTheme === "light");
    themeSwitch.checked = savedTheme === "dark";

    themeSwitch.addEventListener("change", function () {
      if (themeSwitch.checked) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }
});
