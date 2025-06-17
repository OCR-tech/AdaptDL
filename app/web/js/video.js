// =========================================//
// function listAllCameras() {
//   navigator.mediaDevices
//     .enumerateDevices()
//     .then(function (devices) {
//       const videoInputs = devices.filter(
//         (device) => device.kind === "videoinput"
//       );
//       if (videoInputs.length === 0) {
//         alert("No cameras found.");
//       } else {
//         videoInputs.forEach((input) => {
//           if (input.label.includes("Integrated")) {
//             flag_videoSource0 = true;
//           } else if (input.label.includes("USB")) {
//             flag_videoSource1 = true;
//           }
//         });
//       }
//     })
//     .catch(function (err) {
//       alert("Error enumerating devices: " + err);
//     });
// }

// =========================================//
function listAllCameras() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Camera access is not supported by your browser.");
    return;
  }
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
          const videoInputs = devices.filter(
            (device) => device.kind === "videoinput"
          );
          if (videoInputs.length === 0) {
            alert("No cameras found.");
          } else {
            videoInputs.forEach((input) => {
              if (input.label.includes("Integrated")) {
                flag_videoSource0 = true;
              } else if (input.label.includes("USB")) {
                flag_videoSource1 = true;
              }
            });
          }
          // Stop the stream after enumeration
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(function (err) {
          alert("Error enumerating devices: " + err);
        });
    })
    .catch(function (err) {
      alert("Camera permission denied: " + err.message);
    });
}

// =========================================//
// Video source selection
function updateVideoSource() {
  // alert("updateVideoSource");
  const videoSource = document.getElementById("video-source").value;
  const btnBrowse = document.getElementById("btn-browse");
  const btnStart = document.getElementById("btn-start");
  const btnCommand = document.getElementById("btn-command");
  const btnVoice = document.getElementById("btn-voice");
  const btnOk = document.getElementById("btn-ok");
  const ipCameraUrlInput = document.getElementById("ip-camera-url");

  listAllCameras(); // Call the function to list all available cameras
  // alert("flag_videoSource0 : " + flag_videoSource0);
  // alert("flag_videoSource1 : " + flag_videoSource1);

  //------------------------------//
  if (videoSource === "camera") {
    CheckIntegratedCamera(); // Call the function to start the camera
    document.getElementById("status").innerText = "Integrated Camera (default)";
    btnStart.disabled = false; // Disable the start button
    btnCommand.disabled = false; // Disable the command button
    btnVoice.disabled = false; // Disable the voice button
    btnBrowse.disabled = true; // Disable the browse button
    btnOk.disabled = true; // Disable the OK button
    btnOk.style.display = "none"; // Hide the button initially
    ipCameraUrlInput.disabled = true; // Disable the IP camera URL input
    ipCameraUrlInput.style.display = "none"; // Hide the input initially

    //------------------------------//
  } else if (videoSource === "camera_usb") {
    CheckUSBCamera(); // Call the function to start the webcam
    document.getElementById("status").innerText = "USB Camera (external)";
    btnStart.disabled = false; // Disable the start button
    btnCommand.disabled = false; // Disable the command button
    btnVoice.disabled = false; // Disable the voice button
    btnBrowse.disabled = true; // Disable the browse button
    btnOk.disabled = true; // Disable the OK button
    btnOk.style.display = "none"; // Hide the button initially
    ipCameraUrlInput.disabled = true; // Disable the IP camera URL input
    ipCameraUrlInput.style.display = "none"; // Hide the input initially

    //------------------------------//
  } else if (videoSource === "camera_ip") {
    // CheckIPCamera(); // Call the function to start the IP camera
    document.getElementById("status").innerText = "IP Camera (wifi)";
    btnStart.disabled = true; // Disable the start button
    btnCommand.disabled = true; // Disable the command button
    btnVoice.disabled = true; // Disable the voice button
    btnBrowse.disabled = true; // Disable the browse button
    // btnOk.disabled = true; // Disable the OK button
    btnOk.disabled = false; // Disable the OK button
    btnOk.style.display = "block"; // Show the button initially
    ipCameraUrlInput.disabled = false; // Disable the IP camera URL input
    ipCameraUrlInput.style.display = "block"; // Hide the input initially
    // ipCameraUrlInput.value = ""; // Clear previous value
    // ipCameraUrlInput.value = "http://192.168.30.139:4747";
    // ipCameraUrlInput.value = "192.168.233.61:8080";
    ipCameraUrlInput.value = "192.168.233.160:8000";

    ipCameraUrlInput.focus();

    //------------------------------//
  } else if (videoSource === "stream") {
    CheckStream(); // Call the function to start the stream
    document.getElementById("status").innerText = "Stream (internet)";
    btnStart.disabled = true; // Disable the start button
    btnCommand.disabled = true; // Disable the command button
    btnVoice.disabled = true; // Disable the voice button
    btnBrowse.disabled = true; // Disable the browse button
    btnOk.disabled = true; // Disable the OK button
    btnOk.style.display = "block"; // Show the button initially
    ipCameraUrlInput.disabled = false; // Disable the IP camera URL input
    ipCameraUrlInput.style.display = "block"; // Hide the input initially

    //------------------------------//
  } else if (videoSource === "video") {
    CheckVideo(); // Call the function to start the video file selection
    document.getElementById("status").innerText = "Video (file)";
    btnStart.disabled = true; // Disable the start button
    btnCommand.disabled = true; // Disable the command button
    btnVoice.disabled = true; // Disable the voice button
    btnBrowse.disabled = false; // Enable the browse button
    btnOk.disabled = true; // Disable the OK button
    btnOk.style.display = "none"; // Show the button initially
    ipCameraUrlInput.disabled = true; // Disable the IP camera URL input
    ipCameraUrlInput.style.display = "none"; // Hide the input initially
  }
}

// ==========================================//
// Select default camera source
function CheckIntegratedCamera() {
  // alert("CheckIntegratedCamera");
  // Check if video feed is from a built-in camera
  const btnStart = document.getElementById("btn-start");
  const btnStop = document.getElementById("btn-stop");
  const btnCommand = document.getElementById("btn-command");
  const btnVoice = document.getElementById("btn-voice");

  // if the built-in camera is available, use the built-in camera in the video feed
  if (flag_videoSource0 === true) {
    // alert("Built-in camera is available");
    btnStart.disabled = true; // disable the start button
    btnStop.disabled = false; // enable the stop button
    btnCommand.disabled = false; // enable the command button
    btnVoice.disabled = false; // enable the voice button
    startIntegratedCamera();
  } else {
    console.error("Built-in camera not available.");
    return;
  }
}

// ==========================================//
// Select USB camera video source
function CheckUSBCamera() {
  // alert("CheckUSBCamera");
  // Check if video feed is from an external webcam
  const btnStart = document.getElementById("btn-start");
  const btnStop = document.getElementById("btn-stop");
  const btnCommand = document.getElementById("btn-command");
  const btnVoice = document.getElementById("btn-voice");

  // if the built-in camera is available, use the built-in camera in the video feed
  if (flag_videoSource1 === true) {
    // alert("USB camera is available");
    btnStart.disabled = true; // disable the start button
    btnStop.disabled = false; // enable the stop button
    btnCommand.disabled = false; // enable the command button
    btnVoice.disabled = false; // enable the voice button
    startUSBCamera();
  } else {
    console.error("USB camera not available.");
    return;
  }
}

// ==========================================//
// Select IP camera video source
function CheckIPCamera() {
  const videoFeed = document.getElementById("video-feed");
  const video = document.createElement("video");
  const ipCameraUrl = document.getElementById("ip-camera-url").value;

  // document.getElementById("status").innerText = "Starting IP camera...";
  // videoFeed.innerHTML = ""; // Clear previous content
  // video.id = "ip-camera-stream";
  // video.autoplay = true;
  // video.playsInline = true;
  // video.style.width = "100%";
  // video.style.height = "100%";
  // video.style.objectFit = "contain";
  // videoFeed.appendChild(video);
  // // Set the source of the video element to the IP camera URL
  // video.src = ipCameraUrl;
  // video.onloadedmetadata = function () {
  //   video.play();
  //   document.getElementById("status").innerText = "IP Camera stream started.";
  // };
}

// ==========================================//
function validateIPCameraURL() {
  const ipCameraUrl = document.getElementById("ip-camera-url");
  const ipCameraUrlValue = ipCameraUrl.value.trim();
  const btnOk = document.getElementById("btn-ok");

  // btnOk.disabled = true; // Disable the OK button initially
  btnOk.style.display = "block";

  // video_source = "http://192.168.30.139:4747"
  // video_source = "http://192.168.30.139:8080"
  // video_source = "http://192.168.210.139:8080"

  // Check if the URL matches exactly the expected format "xxx.xxx.xx.xxx:xxxx" with total 15 digits
  // if (ipCameraUrlValue.match(/^(http:\/\/)?(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/i)) {
  if (ipCameraUrlValue.match(/^(http:\/\/)?(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/i)) {
    alert("URL format OK");
    document.getElementById("status").innerText = "Valid IP camera URL.";
    btnOk.disabled = false; // enable the OK button if the URL is valid
  } else {
    alert("URL format NOT OK");
    document.getElementById("status").innerText = "Invalid IP camera URL.";
    btnOk.disabled = true; // disable the OK button if the URL is invalid
  }
}

// ==========================================//
function okIPCamera() {
  // Get the IP camera URL from the input field
  const ipCameraUrl = document.getElementById("ip-camera-url").value;
  const btnOk = document.getElementById("btn-ok");
  const btnStart = document.getElementById("btn-start");
  const btnCommand = document.getElementById("btn-command");
  const btnVoice = document.getElementById("btn-voice");

  if (
    ipCameraUrl === "192.168.30.139:4747" ||
    ipCameraUrl === "192.168.30.139:8080" ||
    ipCameraUrl === "192.168.210.139:8080" ||
    ipCameraUrl === "192.168.233.61:8080" ||
    ipCameraUrl === "192.168.233.160:8000"
  ) {
    document.getElementById("status").innerText =
      "IP Camera URL set to: " + ipCameraUrl;
    btnOk.disabled = true; // Disable the OK button after setting the URL
    btnStart.disabled = false; // Enable the start button
    btnCommand.disabled = false; // Enable the command button
    btnVoice.disabled = false; // Enable the voice button
    CheckIPCamera(); // Call the function to start the IP camera
  } else {
    document.getElementById("status").innerText =
      "Please enter a valid IP camera URL.";
  }
}

// ==========================================//
// Select stream video file source
function CheckStream() {
  const videoFeed = document.getElementById("video-feed");
  const video = document.createElement("video");

  document.getElementById("status").innerText = "Starting stream...";

  videoFeed.innerHTML = ""; // Clear previous content
  video.id = "stream-video";
  video.autoplay = true;
  video.playsInline = true;
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "contain";
  videoFeed.appendChild(video);

  // Set the source of the video element to a sample stream URL
  // Replace with your actual stream URL
  const streamUrl = "https://www.example.com/sample-stream"; // Example URL
  video.src = streamUrl;
  video.onloadedmetadata = function () {
    video.play();
    document.getElementById("status").innerText = "Stream started.";
  };
}

// =========================================//
// Browse video cam function
function browseVideoFile() {
  // Open file dialog to select a video file
  const fileInput = document.createElement("input");
  const btnStart = document.getElementById("btn-start");
  const btnCommand = document.getElementById("btn-command");
  const btnVoice = document.getElementById("btn-voice");
  const btnOk = document.getElementById("btn-ok");

  fileInput.type = "file";
  fileInput.accept = "video/*"; // Accept video files only
  fileInput.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      document.getElementById("status").innerText =
        "Selected video file: " + file.name;
      // Here you would typically send the file path to the backend
      btnStart.disabled = false; // Enable the start button
      btnCommand.disabled = false; // Enable the command button
      btnVoice.disabled = false; // Enable the voice button
      btnOk.disabled = true; // Disable the OK button
      playVideoFile(filePath);
    } else {
      document.getElementById("status").innerText = "No file selected.";
    }
  };

  // Open the file dialog
  fileInput.click();
}

// =========================================//
function CheckVideo() {
  const videoFeed = document.getElementById("video-feed");
  const video = document.createElement("video");
  const btnStart = document.getElementById("btn-start");
}

// =========================================//
// Video resolution selection
function selectVideoResolution() {
  const videoResolution = document.getElementById("video-resolution").value;
  document.getElementById("status").innerText =
    "Video resolution set to: " + videoResolution;
  // Here you would typically send the selected resolution to the backend
}

// =========================================//
// Video frame rate selection
function selectVideoFrameRate() {
  const videoFrameRate = document.getElementById("video-frame-rate").value;
  document.getElementById("status").innerText =
    "Video frame rate set to: " + videoFrameRate;
  // Here you would typically send the selected frame rate to the backend
}
