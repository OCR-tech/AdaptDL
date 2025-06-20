document.getElementById("group-frame1").style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
  const sourceSwitch = document.getElementById("source-switch");
  const sourceModeText = document.getElementById("source-mode-text");
  const groupFrame1 = document.getElementById("group-frame1");

  if (!sourceSwitch) console.error("Missing #source-switch");
  if (!sourceModeText) console.error("Missing #source-mode-text");
  if (!groupFrame1) console.error("Missing #group-frame1");

  if (sourceSwitch && sourceModeText && groupFrame1) {
    sourceSwitch.checked = localStorage.getItem("sourceMode") === "on";
    sourceModeText.textContent = sourceSwitch.checked ? "Source" : "Source";
    groupFrame1.style.display = sourceSwitch.checked ? "flex" : "none";
    sourceSwitch.addEventListener("change", function () {
      if (this.checked) {
        showSource();
        // sourceModeText.textContent = "On";
        localStorage.setItem("sourceMode", "on");
      } else {
        HideSource();
        // sourceModeText.textContent = "Off";
        localStorage.setItem("sourceMode", "off");
      }
    });
  }
});

function showSource() {
  const groupFrame1 = document.getElementById("group-frame1");
  if (groupFrame1) groupFrame1.style.display = "flex";
}

function HideSource() {
  const groupFrame1 = document.getElementById("group-frame1");
  if (groupFrame1) groupFrame1.style.display = "none";
}
