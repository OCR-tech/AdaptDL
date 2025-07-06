let mediaRecorder,
  recordedChunks = [];
let objectsDetected = false;

// Start webcam and detection when Start button is pressed
async function startButton() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement("video");
  video.srcObject = stream;
  video.play();

  // Start recording
  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };
  mediaRecorder.start();

  // Load TensorFlow.js COCO-SSD model
  const model = await cocoSsd.load();
  detectLoop(video, model);
}

// Real-time detection loop
async function detectLoop(video, model) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  setInterval(async () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const predictions = await model.detect(canvas);
    if (predictions.length > 0 && !objectsDetected) {
      objectsDetected = true;
      mediaRecorder.stop();
      saveAndUpload();
    }
    // Optionally: draw boxes on video/canvas here
  }, 200); // 5 FPS
}

// Called when recording stops and objects were detected
function saveAndUpload() {
  mediaRecorder.onstop = async () => {
    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    const metaObj = {
      timestamp: new Date().toISOString(),
      objectNumber: "12",
      objectName: "Cable Organizer",
      numberOfObject: "1",
      frameFilename: "frame_12.jpg",
    };
    await uploadDetectionResult(videoBlob, metaObj);
  };
}

// Upload video and metadata to backend
async function uploadDetectionResult(videoBlob, metaObj) {
  const formData = new FormData();
  formData.append("video", videoBlob, "recorded.webm");
  const metaBlob = new Blob([JSON.stringify(metaObj)], {
    type: "application/json",
  });
  formData.append("metadata", metaBlob, "metadata.json");
  await fetch("http://localhost:5500/api/upload", {
    method: "POST",
    body: formData,
  });
  alert("Objects detected! Video and metadata uploaded.");
}
