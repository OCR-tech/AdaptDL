// =========================================//
let cachedGPS = { latitude: null, longitude: null };

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      cachedGPS.latitude = position.coords.latitude;
      cachedGPS.longitude = position.coords.longitude;
    },
    function (err) {
      alert("Geolocation error:", err);
    }
  );
} else {
  alert("Geolocation not supported by this browser.");
}

// =========================================//
document.addEventListener("DOMContentLoaded", function () {
  const dateTimeSwitch = document.getElementById("datetime-switch");
  if (!dateTimeSwitch) return;

  // Set the switch state from localStorage
  dateTimeSwitch.checked =
    localStorage.getItem("dateTimeOverlayEnabled") === "on";

  // Set initial overlay state
  window.showDateTimeOverlay = dateTimeSwitch.checked;

  // Add event listener
  dateTimeSwitch.addEventListener("change", toggleDateTime);
});

// =========================================//
function toggleDateTime() {
  // alert("ToggleDateTime");
  const dateTimeSwitch = document.getElementById("datetime-switch");
  if (dateTimeSwitch) {
    window.showDateTimeOverlay = dateTimeSwitch.checked;
    localStorage.setItem(
      "dateTimeOverlayEnabled",
      dateTimeSwitch.checked ? "on" : "off"
    );
  }
}

// =========================================//
// Display current date and time in on canvas
function displayDateTime() {
  if (!ctx || !canvas) return;
  const now = new Date();
  const dateTimeString = now.toLocaleString();
  ctx.save();
  // ctx.font = "16px Arial";
  ctx.font = "20px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  // Draw background rectangle for better readability
  const textWidth = ctx.measureText(dateTimeString).width;
  ctx.fillRect(8, 8, textWidth + 8, 24);
  ctx.fillStyle = "#FFF";
  ctx.fillText(dateTimeString, 12, 26);
  ctx.restore();
}

// =========================================//
// Initialize GPS overlay state from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const gpsSwitch = document.getElementById("gps-switch");
  if (!gpsSwitch) return;

  // Read from localStorage, default to false if not set
  let stored = localStorage.getItem("gpsOverlayEnabled");
  let enabled;
  if (stored === null) {
    enabled = false;
    localStorage.setItem("gpsOverlayEnabled", "false");
  } else {
    enabled = stored === "true";
  }
  gpsSwitch.checked = enabled;
  window.showGPSLocation = enabled;

  gpsSwitch.addEventListener("change", function () {
    window.showGPSLocation = gpsSwitch.checked;
    localStorage.setItem("gpsOverlayEnabled", gpsSwitch.checked);
  });
});

// =========================================//
function toggleGPS() {
  const gpsSwitch = document.getElementById("gps-switch");
  if (gpsSwitch) {
    window.showGPSLocation = gpsSwitch.checked;
    localStorage.setItem("gpsOverlayEnabled", gpsSwitch.checked);
  }
}

// =========================================//
// Display current GPS location on canvas
function displayGPSlocation(latitude, longitude) {
  if (!ctx || !canvas) return;
  const gpsString = `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`;
  ctx.save();
  ctx.font = "20px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  const textWidth = ctx.measureText(gpsString).width;
  // Draw background rectangle below the date/time
  const padding = 8;
  const textHeight = 24;
  const x = padding;
  const y = canvas.height - textHeight - padding;
  ctx.fillRect(x, y, textWidth + padding, textHeight);
  ctx.fillStyle = "#FFF";
  ctx.fillText(gpsString, x + 4, y + textHeight - 6);
  ctx.restore();
}
