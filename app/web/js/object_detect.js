window.voiceAlertEnabled = true;
window.showDateTimeOverlay = true;
window.showGPSLocation = true;

// =========================================//
function detectFrame() {
  if (!model || !video || video.paused || video.ended) {
    return;
  }
  model.detect(video).then(function (predictions) {
    if (predictions && predictions.length > 0 && window.voiceAlertEnabled) {
      playVoiceAlertOnDetection("Object detected.");
    }
    // Draw predictions on the canvas
    drawPredictions(predictions);
    animationId = requestAnimationFrame(detectFrame);
  });
}

// =========================================//
function drawPredictions(predictions) {
  if (!ctx || !canvas || !video) return;
  // Resize canvas if needed
  if (
    canvas.width !== video.videoWidth ||
    canvas.height !== video.videoHeight
  ) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  predictions.forEach(function (prediction) {
    // Draw bounding box
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(...prediction.bbox);
    // Draw label background
    ctx.fillStyle = "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = 16;
    ctx.fillRect(
      prediction.bbox[0],
      prediction.bbox[1] - textHeight,
      textWidth + 10,
      textHeight
    );
    // Draw text
    ctx.fillStyle = "#222";
    ctx.font = "16px Arial";
    ctx.fillText(
      prediction.class,
      prediction.bbox[0] + 5,
      prediction.bbox[1] - 4
    );
  });

  // Draw date and time overlay
  if (window.showDateTimeOverlay) {
    displayDateTime();
  }

  // Draw GPS location overlay if enabled
  if (
    window.showGPSLocation &&
    cachedGPS.latitude !== null &&
    cachedGPS.longitude !== null
  ) {
    displayGPSlocation(cachedGPS.latitude, cachedGPS.longitude);
  }
}
