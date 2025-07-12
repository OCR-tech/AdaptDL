// =========================================//
function detectFrame() {
  // alert("DetectFrame");

  if (!model || !video || video.paused || video.ended) {
    return;
  }
  model.detect(video).then(function (predictions) {
    // Check for object detection
    const objectNames = predictions.map((p) => p.class).join(", ");

    //=========================================//
    if (predictions && predictions.length > 0 && window.voiceAlertEnabled) {
      setVoiceAlert("Object detected");
    } else {
      if (window.voiceAlertEnabled) {
        stopVoiceAlert();
      }
    }

    //=========================================//
    // Email alert for object detection
    if (predictions && predictions.length > 0 && window.emailAlertEnabled) {
      // alert("sendEmailAlert: " + objectNames);
      console.log("sendEmailAlert: " + objectNames);
      // okEmailAlert();
      // sendEmailAlert(objectNames);
    }

    //=========================================//
    // Notification for object detection
    if (predictions && predictions.length > 0 && window.notificationEnabled) {
      // alert("Object detected: " + objectNames);
      notifyDetection(objectNames);
    }

    //=========================================//
    // Check if motion detection is enabled
    if (window.motionDetectionEnabled) {
      // alert("Motion detection enabled");
      // updateMotionDetection();
      setInterval(updateMotionDetection, 200); // every 200ms
      // const video = document.getElementById("video");
      // video.onloadedmetadata = function () {
      //   setInterval(updateMotionDetection, 200);
      // };
    }

    //=========================================//
    // Check if sound detection is enabled
    // if (window.soundDetectionEnabled) {
    //   // alert("Sound detection enabled");
    //   // Call the sound detection function
    //   const soundSensitivity =
    //     parseInt(localStorage.getItem("soundSensitivity")) || 30;
    //   prevSamples = prevSamples || new Float32Array(0);
    //   currSamples = currSamples || new Float32Array(0);
    //   const soundLevel = detectSoundLevel(
    //     prevSamples,
    //     currSamples,
    //     soundSensitivity
    //   );

    //   if (soundLevel) {
    //     alert("Sound detected");
    //     playVoiceAlert("Sound detected");
    //   }
    // }

    //=========================================//

    //=========================================//
    //=========================================//
    // Draw predictions on the canvas
    drawPredictions(predictions);

    if (window.runDetectionLoop) {
      // Request the next animation frame
      window.animationId = requestAnimationFrame(detectFrame);
    }
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
    // ===========================================//
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

  // ===========================================//
  // Draw date and time overlay
  if (window.showDateTimeOverlay) {
    displayDateTime();
  }

  // ===========================================//
  // Draw GPS location overlay if enabled
  if (
    window.showGPSLocation &&
    cachedGPS.latitude !== null &&
    cachedGPS.longitude !== null
  ) {
    displayGPSlocation(cachedGPS.latitude, cachedGPS.longitude);
  }
}
