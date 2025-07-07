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
// Display current GPS location on canvas
function displayGPSlocation(latitude, longitude) {
  if (!ctx || !canvas) return;
  const gpsString = `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`;
  ctx.save();
  ctx.font = "20px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  const textWidth = ctx.measureText(gpsString).width;
  // Draw background rectangle below the date/time
  ctx.fillRect(8, 40, textWidth + 8, 24);
  ctx.fillStyle = "#FFF";
  ctx.fillText(gpsString, 12, 58);
  ctx.restore();
}

// =========================================//
function toggleGPS() {
  // alert("ToggleGPS");

  // flag for Draw/Hide GPS location overlay
  window.showGPSLocation = !window.showGPSLocation;

  // Save the state to localStorage
  localStorage.setItem("gpsOverlayEnabled", gpsOverlayEnabled);
}

// =========================================//
function toggleDateTime() {
  // alert("ToggleDateTime");

  // flag for Draw/Hide Date/Time overlay
  window.showDateTimeOverlay = !window.showDateTimeOverlay;

  // Save the state to localStorage
  localStorage.setItem("dateTimeOverlayEnabled", dateTimeOverlayEnabled);
}
// =========================================//
