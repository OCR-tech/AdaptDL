# AdaptDL: Real-Time Object Detection System with Voice Commands

![Python](https://img.shields.io/badge/python-3.11%2B-blue)
![TensorFlow](https://img.shields.io/badge/tensorflow-2.18%2B-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

<!-- ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=OCR-tech.AdaptDL) -->

**AdaptDL** is a Python-based real-time object detection system using deep learning with voice commands for surveillance applications.

The system detects target objects from a webcam in real-time using a deep learning model, and overlays bounding boxes and labels on the detected objects in the video stream. It features user-input voice commands and adapts to user preferences over time based on voice command history and surrounding environments.

<br/>
<p align="center">
<img src="docs/public/img/img1a.png" style="width:45%; height:auto;">&emsp;
</p>

## Features

- **Real-time Detection**: Detects objects in live video from a webcam.
- **Bounding Boxes and Labels**: Overlays bounding boxes and labels on the detected objects.
- **Voice Command Control**: Users can use voice commands to control the system.
- **Adaptability**: Adapts to user preferences and improves based on input command history and environments.
- **Web Version**: A browser-based demo for real-time object detection.

<!-- - **Keyboard Shortcuts**: Allow quick access to key functionalities.
- **Object Selection**: Users can select target objects for detection.
- **Snapshot Saving**: Users can save snapshots of detected objects.
- **Sound Alerts**: The system generates sound alerts based on detection.
- **SMS Alert**: Sends an SMS alert when certain objects are detected.
- **Adaptability**: The system adapts to user preferences and improves based on input voice command history and environmental challenges. -->

<!-- - Select target objects.
- Save snapshots of detected objects.
- Generate sound alerts based on detection. -->

## Requirements

Install the following dependencies:

- **Python** >= 3.11
- **Tensorflow** >= 2.18
- **OpenCV** (video capturing and processing)
- **SpeechRecognition** (voice command processing)
- **PyAudio** (microphone setup)

## Installation

To install and run this project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/OCR-tech/AdaptDL.git
   cd AdaptDL
   ```

2. Create a virtual environment:

   ```sh
   python -m venv .venv
   .\.venv\Scripts\Activate
   ```

3. Install the dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Run the application:

   ```sh
   python app/main.py
   ```

## Usage

To run this project:

1. Run the application.
2. The system will launch the webcam and start detecting objects in real-time.
3. Use voice commands or keyboard shortcuts to interact with the system.

<!-- Voice Commands: -->
<!-- | Voice Command        | Description                         |
| -------------------- | ----------------------------------- |
| Detect [Object Name] | Detect specific objects             |
| Stop [Object Name]   | Stop detecting specific objects     |
| Save [Object Name]   | Save a snapshot of detected objects |
| Help                 | List available commands             |
| Exit                 | Exit the program                    | -->
<!-- - "**Detect [Object Name]**": Detect specific objects (e.g., "Detect car").
- "**Stop [Object Name]**": Stop detecting specific objects (e.g., "Stop car").
- "**Save [Object Name]**": Save a snapshot of specific detected objects (e.g., "Save car").
- "**Help**": List available commands.
- "**Exit**": Exit the program. -->
<!-- - "**Detect**": Detect all objects in the model.
- "**Stop**": Stop detecting all objects.
- "**Alert**": Generate an alert sound when all objects are detected.
- "**Alert [Object Name]**": Generate an alert sound when specific objects are detected (e.g., "Alert person").
- "**Save**": Save a snapshot of all detected objects. -->

<!-- Keyboard Shortcuts: -->
<!-- | Keyboard Shortcut | Action                                |
| ----------------- | ------------------------------------- |
| 's'               | Save a snapshot with detected objects |
| 'd'               | Detect specific objects               |
| 'h'               | List available commands               |
| 'Esc'             | Exit the program                      | -->
<!-- - **Press 's'**: to save a snapshot with detected objects.
- **Press 'd'**: to detect specific objects.
- **Press 'Esc'**: to exit the program. -->
  <!-- - **Press 'h'**: to list available commands. -->
  <!-- - **Press 'a'**: to generate an alert sound when specific objects are detected. -->

The system adapts to user preferences over time based on input voice command history, improving accuracy and user experience.

## Web Version

The web version is a browser-based demo for real-time object detection. It supports:

- **Webcam Input**: Use built-in webcam or external USB webcam.
- **Video File Input**: Upload video files for detection.
- **IP Camera Input**: Connect to IP cameras or mobile devices.
- **Internet Video Streams**: Stream video from compatible URLs.

**Requirements:**

- Modern web browser (Chrome, Edge, Firefox, Safari)
- Webcam access permission
- Must be served via Localhost or HTTPS

**How to run:**

1. Open a terminal and navigate to `app/web`.
2. Run a local server: `python -m http.server 8000`
   <!-- ```sh
   python -m http.server 8000
   ``` -->
3. Open your browser at http://localhost:8000.
4. Click **Start** to begin real-time object detection.

<!-- ![Demo Screenshot](docs/public/img/img1a.png) -->
<!-- <br/>
<p align="center">
<img src="docs/public/img/img1b.png" style="width:35%; height:auto;">&emsp;
</p> -->

<!-- ## Customization

You can customize the system's behavior by modifying the configuration settings in the config.yaml file:
The system's behavior can be customized by modifying the default settings in the `config.py` file:

- **Target Object Settings**: Define which objects you want to detect.
- **Alert Settings**: Adjust sound alert thresholds and preferences.
- **Voice Command History**: Configure how the system adapts to voice command history. -->

## Contributing

- See the [CONTRIBUTING](CONTRIBUTING.md) for detailed guidelines.

## License

- This project is licensed under the [MIT License](LICENSE).

## Contact

- **Email**: ocrtech.mail@gmail.com
- **Website**: [https://ocr-tech.github.io](https://ocr-tech.github.io)
- **GitHub**: [https://github.com/OCR-tech](https://github.com/OCR-tech)
