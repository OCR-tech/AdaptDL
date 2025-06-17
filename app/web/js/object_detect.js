// =========================================//
let model = null;
let animationId = null;
let video = null;
let canvas = null;
let ctx = null;
let stream = null;

// =========================================//
// Import the COCO-SSD model from TensorFlow.js
// Load the COCO-SSD model on page load
window.addEventListener("DOMContentLoaded", function () {
  cocoSsd
    .load()
    .then(function (loadedModel) {
      model = loadedModel;
      initSystem();
      // requestCameraPermission();
      listAllCameras();

      document.getElementById("status").innerText = "Ready!";
      document.getElementById("theme-switch").disabled = false;
      document.getElementById("btn-start").disabled = false;
      document.getElementById("btn-command").disabled = false;
      document.getElementById("btn-voice").disabled = false;
      document.getElementById("btn-settings").disabled = false;
      document.getElementById("btn-stop").disabled = false;
    })
    .catch(function (err) {
      document.getElementById("status").innerText = "Model load error: " + err;
    });
});

// =========================================//
function requestCameraPermission() {
  alert("RequestingCameraPermission");
}

// =========================================//
function initSystem() {
  // alert("InitializeSystem");

  // Check if the browser supports getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request camera permission
    // requestCameraPermission();
  } else {
    document.getElementById("status").innerText =
      "Camera access is not supported by your browser.";
    alert("Camera access is not supported by your browser.");
    return;
  }
}

// =========================================//
function startButton() {
  // alert("StartButton");

  // document.getElementById("status").innerText = "Start";
  document.getElementById("btn-start").style.display = "none";
  document.getElementById("btn-stop").style.display = "inline-block";

  const videoSource = document.getElementById("video-source").value;

  // Check Video source selection
  if (videoSource === "camera") {
    startIntegratedCamera();
  } else if (videoSource === "camera_usb") {
    startUSBCamera();
  } else if (videoSource === "camera_ip") {
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
function startIntegratedCamera() {
  // alert("StartingIntegratedCamera");
  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      let integratedCamera = videoInputs.find(
        (device) =>
          device.label.toLowerCase().includes("integrated") ||
          device.label.toLowerCase().includes("built-in")
      );
      // Fallback: use the first camera if no label matches
      if (!integratedCamera && videoInputs.length > 0) {
        integratedCamera = videoInputs[0];
      }
      if (!integratedCamera) {
        document.getElementById("status").innerText =
          "No integrated camera found.";
        return;
      }
      // Start the camera using the deviceId
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: integratedCamera.deviceId } },
          audio: false,
        })
        .then(function (mediaStream) {
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
          video = document.createElement("video");
          video.id = "camera-stream";
          video.autoplay = true;
          video.playsInline = true;
          video.muted = true;
          video.style.width = "100%";
          video.style.height = "100%";
          video.style.objectFit = "contain";
          canvas = document.createElement("canvas");
          canvas.id = "overlay";
          canvas.style.position = "absolute";
          canvas.style.top = "0";
          canvas.style.left = "0";
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.pointerEvents = "none";
          const videoFeed = document.getElementById("video-feed");
          videoFeed.innerHTML = "";
          videoFeed.appendChild(video);
          videoFeed.appendChild(canvas);
          const placeholder = document.getElementById("video-placeholder");
          if (placeholder) placeholder.style.display = "none";
          stream = mediaStream;
          video.srcObject = mediaStream;
          video.onloadedmetadata = function () {
            video.play();
            video.addEventListener("playing", function onPlay() {
              video.removeEventListener("playing", onPlay);
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx = canvas.getContext("2d");
              document.getElementById("status").innerText = "Detecting...";
              document.getElementById("btn-start").style.display = "none";
              document.getElementById("btn-stop").style.display =
                "inline-block";
              detectFrame();
            });
          };
        })
        .catch(function (err) {
          document.getElementById("status").innerText =
            "Unable to access integrated camera: " + err.message;
        });
    })
    .catch(function (err) {
      document.getElementById("status").innerText =
        "Error enumerating devices: " + err.message;
    });
}

// =========================================//
function startUSBCamera() {
  // alert("StartingUSBCamera");
  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      let integratedCamera = videoInputs.find(
        (device) =>
          device.label.toLowerCase().includes("integrated") ||
          device.label.toLowerCase().includes("built-in")
      );
      // Try to find a USB or external camera by label
      let usbCamera = videoInputs.find(
        (device) =>
          device.label.toLowerCase().includes("usb") ||
          device.label.toLowerCase().includes("external")
      );
      // Fallback: use the second camera if available (often USB)
      if (!usbCamera && videoInputs.length > 1) {
        usbCamera = videoInputs[1];
      }
      // If still not found, use the first camera
      if (!usbCamera && videoInputs.length > 0) {
        usbCamera = videoInputs[0];
      }
      // Start the camera using the deviceId
      if (!usbCamera) {
        document.getElementById("status").innerText = "No USB camera found.";
        return;
      }
      // Start the camera using the deviceId
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: usbCamera.deviceId } },
          audio: false,
        })
        .then(function (mediaStream) {
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
          video = document.createElement("video");
          video.id = "usb-camera-stream";
          video.autoplay = true;
          video.playsInline = true;
          video.muted = true;
          video.style.width = "100%";
          video.style.height = "100%";
          video.style.objectFit = "contain";
          canvas = document.createElement("canvas");
          canvas.id = "overlay";
          canvas.style.position = "absolute";
          canvas.style.top = "0";
          canvas.style.left = "0";
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.pointerEvents = "none";
          const videoFeed = document.getElementById("video-feed");
          videoFeed.innerHTML = "";
          videoFeed.appendChild(video);
          videoFeed.appendChild(canvas);
          const placeholder = document.getElementById("video-placeholder");
          if (placeholder) placeholder.style.display = "none";
          stream = mediaStream;
          video.srcObject = mediaStream;
          video.onloadedmetadata = function () {
            video.play();
            document.getElementById("status").innerText = "Detecting...";
            video.addEventListener("playing", function onPlay() {
              video.removeEventListener("playing", onPlay);
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx = canvas.getContext("2d");
              document.getElementById("status").innerText = "Detecting...";
              document.getElementById("btn-start").style.display = "none";
              document.getElementById("btn-stop").style.display =
                "inline-block";
              detectFrame();
            });
          };
        })
        .catch(function (err) {
          document.getElementById("status").innerText =
            "Unable to access USB camera: " + err.message;
        });
    })
    .catch(function (err) {
      document.getElementById("status").innerText =
        "Error enumerating devices: " + err.message;
    });
}

// =========================================//
// Using /shot.jpg Fallback
// function startIPCamera() {
//   document.getElementById("status").innerText = "Starting IP Camera...";
//   let baseUrl = "http://192.168.233.61:8080";
//   const shotUrl = baseUrl + "/shot.jpg";

//   if (video) {
//     video.pause();
//     if (video.srcObject) {
//       video.srcObject.getTracks().forEach((track) => track.stop());
//     }
//     video.remove();
//     video = null;
//   }
//   if (canvas) {
//     canvas.remove();
//     canvas = null;
//   }

//   canvas = document.createElement("canvas");
//   canvas.id = "overlay";
//   canvas.style.position = "absolute";
//   canvas.style.top = "0";
//   canvas.style.left = "0";
//   canvas.style.width = "100%";
//   canvas.style.height = "100%";
//   canvas.style.pointerEvents = "none";
//   const videoFeed = document.getElementById("video-feed");
//   videoFeed.innerHTML = "";
//   videoFeed.appendChild(canvas);
//   ctx = canvas.getContext("2d");

//   const placeholder = document.getElementById("video-placeholder");
//   if (placeholder) placeholder.style.display = "none";

//   function fetchAndDetect() {
//     const img = new window.Image();
//     img.crossOrigin = "Anonymous";
//     img.onload = function () {
//       if (canvas.width !== img.width || canvas.height !== img.height) {
//         canvas.width = img.width;
//         canvas.height = img.height;
//       }
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       if (model) {
//         model.detect(canvas).then(function (predictions) {
//           drawPredictions(predictions);
//           document.getElementById("status").innerText = "Detecting...";
//           animationId = requestAnimationFrame(fetchAndDetect);
//         });
//       } else {
//         animationId = requestAnimationFrame(fetchAndDetect);
//       }
//     };
//     img.onerror = function () {
//       document.getElementById("status").innerText =
//         "Error loading IP camera frame. Check the URL and network.";
//       setTimeout(fetchAndDetect, 1000);
//     };
//     img.src = shotUrl + "?t=" + Date.now();
//   }

//   fetchAndDetect();
//   document.getElementById("btn-start").style.display = "none";
//   document.getElementById("btn-stop").style.display = "inline-block";
// }

// =========================================//
function startIPCamera() {
  document.getElementById("status").innerText = "Starting IP Camera...";

  // Get the base URL from the input field
  // const ipCameraUrl = document.getElementById("ip-camera-url").value;

  let ipCameraUrl = "192.168.233.160:8000";

  // let ipCameraUrl = "192.168.233.61:8080";
  // let ipCameraUrl = "http://192.168.233.61:8080";
  // const shotUrl = ipCameraUrl;
  // const shotUrl = ipCameraUrl + "/video";
  const shotUrl = "http://" + ipCameraUrl + "/shot.jpg";

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

  canvas = document.createElement("canvas");
  canvas.id = "overlay";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  const videoFeed = document.getElementById("video-feed");
  videoFeed.innerHTML = "";
  videoFeed.appendChild(canvas);
  ctx = canvas.getContext("2d");

  const placeholder = document.getElementById("video-placeholder");
  if (placeholder) placeholder.style.display = "none";

  function fetchAndDetect() {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
      setTimeout(fetchAndDetect, 1000);
    };
    img.src = shotUrl + "?t=" + Date.now();
    // img.src = shotUrl;
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
  const placeholder = document.getElementById("video-placeholder");

  document.getElementById("btn-start").style.display = "inline-block";
  document.getElementById("btn-stop").style.display = "none";
  document.getElementById("status").innerText = "Stopped";

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
