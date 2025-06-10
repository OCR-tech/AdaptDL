// =========================================//
let model = null;
let animationId = null;
let video = null;
let canvas = null;
let ctx = null;
let stream = null;

// Load the COCO-SSD model on page load
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  document.getElementById("status").innerText = "Ready!";
  document.getElementById("btn-start").disabled = false;
  document.getElementById("btn-command").disabled = false;
  document.getElementById("btn-voice").disabled = false;
  document.getElementById("btn-settings").disabled = false;
  document.getElementById("btn-stop").disabled = false;
});

// =========================================//
function startButton() {
  const videoSource = document.getElementById("video-source").value;

  // Check Video source selection
  if (videoSource === "camera") {
    startCamera();
  } else if (videoSource === "webcam") {
    startWebcam();
  } else if (videoSource === "ip_camera") {
    startIPCamera();
  } else if (videoSource === "stream") {
    startStream();
  } else if (videoSource === "video") {
    const videoFile = document.getElementById("video-file").files[0];
    if (!videoFile) {
      document.getElementById("status").innerText =
        "Please select a video file.";
      return;
    }
    startVideoFile(videoFile);
  }
}

// =========================================//
function startCamera() {
  document.getElementById("status").innerText = "Starting Camera...";
  // Remove previous video/canvas if any
  if (video) {
    video.pause();
    video.srcObject = null;
    video.remove();
    video = null;
  }
  if (canvas) {
    canvas.remove();
    canvas = null;
  }
  // Create video element
  video = document.createElement("video");
  video.id = "webcam-stream";
  video.autoplay = true;
  video.playsInline = true;
  video.muted = true; // Ensure autoplay works in all browsers
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "contain";
  // Create canvas for drawing
  canvas = document.createElement("canvas");
  canvas.id = "overlay";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  // Insert into DOM
  const videoFeed = document.getElementById("video-feed");
  videoFeed.innerHTML = "";
  videoFeed.appendChild(video);
  videoFeed.appendChild(canvas);
  // Hide placeholder
  const placeholder = document.getElementById("video-placeholder");
  if (placeholder) placeholder.style.display = "none";
  // Access webcam
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (mediaStream) {
      stream = mediaStream;
      video.srcObject = mediaStream;
      video.onloadedmetadata = function () {
        video.play();
        // Wait for video to be ready
        video.addEventListener("playing", function onPlay() {
          video.removeEventListener("playing", onPlay);
          // Set canvas size to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx = canvas.getContext("2d");
          document.getElementById("status").innerText = "Detecting...";
          document.getElementById("btn-start").style.display = "none";
          document.getElementById("btn-stop").style.display = "inline-block";
          detectFrame();
        });
      };
    })
    .catch(function (err) {
      document.getElementById("status").innerText =
        "Unable to access webcam: " + err.message;
    });
}

// =========================================//
function startWebcam() {
  document.getElementById("status").innerText = "Starting Webcam...";
  // Remove previous video/canvas if any
  if (video) {
    video.pause();
    video.srcObject = null;
    video.remove();
    video = null;
  }
  if (canvas) {
    canvas.remove();
    canvas = null;
  }
  // Create video element
  video = document.createElement("video");
  video.id = "webcam-stream";
  video.autoplay = true;
  video.playsInline = true;
  video.muted = true; // Ensure autoplay works in all browsers
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "contain";
  // Create canvas for drawing
  canvas = document.createElement("canvas");
  canvas.id = "overlay";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  // Insert into DOM
  const videoFeed = document.getElementById("video-feed");
  videoFeed.innerHTML = "";
  videoFeed.appendChild(video);
  videoFeed.appendChild(canvas);
  // Hide placeholder
  const placeholder = document.getElementById("video-placeholder");
  if (placeholder) placeholder.style.display = "none";
  // Access webcam
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (mediaStream) {
      stream = mediaStream;
      video.srcObject = mediaStream;
      video.onloadedmetadata = function () {
        video.play();
        // Wait for video to be ready
        video.addEventListener("playing", function onPlay() {
          video.removeEventListener("playing", onPlay);
          // Set canvas size to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx = canvas.getContext("2d");
          document.getElementById("status").innerText = "Detecting...";
          document.getElementById("btn-start").style.display = "none";
          document.getElementById("btn-stop").style.display = "inline-block";
          detectFrame();
        });
      };
    })
    .catch(function (err) {
      document.getElementById("status").innerText =
        "Unable to access webcam: " + err.message;
    });
}

// =========================================//
function startIPCamera() {
  document.getElementById("status").innerText = "Starting IP Camera...";

  // Clean up previous video/canvas if any
  if (video) {
    video.pause();
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    video.remove();
    video = null;
  }
  if (canvas) {
    canvas.remove();
    canvas = null;
  }

  // Get and sanitize the base URL
  const ipCameraUrl = document.getElementById("ip-camera-url").value.trim();
  let baseUrl = ipCameraUrl.replace(/\/+$/, ""); // Remove trailing slashes
  const shotUrl = baseUrl + "/shot.jpg";
  alert("IP Camera URL: " + shotUrl);

  // Prepare canvas for drawing
  const videoFeed = document.getElementById("video-feed");
  videoFeed.innerHTML = "";
  canvas = document.createElement("canvas");
  canvas.id = "overlay";
  canvas.style.position = "relative";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  videoFeed.appendChild(canvas);
  ctx = canvas.getContext("2d");

  // Hide placeholder if any
  const placeholder = document.getElementById("video-placeholder");
  if (placeholder) placeholder.style.display = "none";

  // Frame fetching and detection loop
  function fetchAndDetect() {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      // Set canvas size to match image
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Run detection if model is loaded
      if (model) {
        model.detect(canvas).then(function (predictions) {
          drawPredictions(predictions);
          document.getElementById("status").innerText = "Detecting...";
          animationId = requestAnimationFrame(fetchAndDetect);
        });
      } else {
        animationId = requestAnimationFrame(fetchAndDetect);
      }
    };
    img.onerror = function () {
      document.getElementById("status").innerText =
        "Error loading IP camera frame. Check the URL and network.";
      // Retry after a short delay
      setTimeout(fetchAndDetect, 1000);
    };
    img.src = shotUrl + "?t=" + Date.now(); // Prevent caching
  }

  fetchAndDetect();
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-stop").style.display = "inline-block";
}

// =========================================//
function startStream() {
  document.getElementById("status").innerText = "Starting Streaming Video...";
}

// =========================================//
function startVideo() {
  document.getElementById("status").innerText = "Starting Video file...";
}

// =========================================//
function stopButton() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (video) {
    video.pause();
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    video.remove();
    video = null;
  }
  if (canvas) {
    canvas.remove();
    canvas = null;
  }
  document.getElementById("btn-start").style.display = "inline-block";
  document.getElementById("btn-stop").style.display = "none";
  document.getElementById("status").innerText = "Stopped";
  const placeholder = document.getElementById("video-placeholder");
  if (placeholder) placeholder.style.display = "block";
}

// =========================================//
function detectFrame() {
  if (!model || !video || video.paused || video.ended) {
    return;
  }
  model.detect(video).then(function (predictions) {
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
}
