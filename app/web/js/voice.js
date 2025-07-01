// =========================================//
function updateValueCommand(val) {
  document.getElementById("volume-value-command").textContent = val;
}

// =========================================//
function updateValueAlert(val) {
  document.getElementById("volume-value-alert").textContent = val;
}

// =========================================//
function updateValueStatus(val) {
  document.getElementById("volume-value-status").textContent = val;
}

// =========================================//
function voiceCommand() {
  // Example command handling logic
  if (commandText.includes("volume")) {
    const volumeLevel = extractVolumeLevel(commandText);
    setVolume(volumeLevel);
  }

  startVoiceCommand(function (commandText) {
    // Handle the recognized command here
    console.log("Recognized command:", commandText);

    // You can trigger actions based on commandText
  });
}

// =========================================//
/**
 * Start voice command recognition and handle recognized commands.
 * Requires browser support for the Web Speech API.
 * @param {function} onCommand - Callback to handle recognized command text.
 */
function startVoiceCommand(onCommand) {
  // Check for browser support
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    document.getElementById("status").innerText =
      "Voice recognition not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function () {
    document.getElementById("status").innerText =
      "Listening for voice command...";
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim();
    document.getElementById("status").innerText = `Heard: "${transcript}"`;
    if (typeof onCommand === "function") {
      onCommand(transcript);
    }
  };

  recognition.onerror = function (event) {
    document.getElementById("status").innerText =
      "Voice recognition error: " + event.error;
  };

  recognition.onend = function () {
    // Optionally restart or update status
    document.getElementById("status").innerText = "Voice recognition stopped.";
  };

  recognition.start();
}

// =========================================//
function speak(text) {
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }
}
// Call speak("Command received") after a command is recognized.
