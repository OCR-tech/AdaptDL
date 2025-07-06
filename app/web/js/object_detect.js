window.voiceAlertEnabled = true;

// =========================================//
function detectFrame() {
  if (!model || !video || video.paused || video.ended) {
    return;
  }
  model.detect(video).then(function (predictions) {
    if (predictions && predictions.length > 0 && window.voiceAlertEnabled) {
      playVoiceAlertOnDetection("Object detected.");
    }
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
  displayDateTime(); // <-- Add this line
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
