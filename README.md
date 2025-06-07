# AdaptDL: Real-Time Object Detection with Voice Commands

![Python](https://img.shields.io/badge/python-3.11%2B-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

<!-- ![Build](https://img.shields.io/github/actions/workflow/status/OCR-tech/AdaptDL/ci.yml?branch=main&label=build)
![Tests](https://img.shields.io/github/actions/workflow/status/OCR-tech/AdaptDL/test.yml?label=tests)
![Coverage](https://img.shields.io/codecov/c/github/OCR-tech/AdaptDL?label=coverage) -->

<!-- ![Build Status](https://github.com/OCR-tech/AdaptDL/actions/workflows/ci.yml/badge.svg)
![Test Status](https://github.com/OCR-tech/AdaptDL/actions/workflows/test.yml/badge.svg)
![Coverage Status](https://img.shields.io/codecov/c/github/OCR-tech/AdaptDL?label=coverage) -->

<!-- ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=OCR-tech.AdaptDL) -->

**AdaptDL** is a Python-based real-time object detection system using deep learning with voice commands for surveillance applications.

The system detects target objects from a webcam in real-time using a deep learning model, and overlays bounding boxes and labels on the detected objects in the video stream. It features functionality based on user-input voice commands, including selecting target objects, saving snapshots, and generating sound alerts. The system adapts to user preferences based on voice command history and can handle challenging environments.

<br/>
<p align="center">
<img src="docs/public/img/img1a.png" style="width:45%; height:auto;">&emsp;
</p>

## Features

- **Real-time Object Detection**: Detects objects in live video captured from a webcam using a deep learning model.
- **Bounding Boxes and Labels**: Overlays bounding boxes and labels on the detected objects in the video stream.
- **Voice Command Control**: Users can interact with the system through voice commands:
  - Select target objects.
  - Save snapshots of detected objects.
  - Generate sound alerts based on detection.
  <!-- - **SMS Alert**: Sends an SMS alert when certain objects are detected. -->
- **Adaptability**: The system adapts to user preferences and improves based on input voice command history and environmental challenges.

## Requirements

Install the following dependencies:

- **Python** >= 3.11
- **OpenCV** (video capturing and processing)
- **SpeechRecognition** (voice command processing)
- **PyAudio** (microphone setup)
  <!-- - Tensorflow 2.18 or higher, for deep learning model -->
  <!-- - Tensorflow Hub 0.13 or higher, for loading the pre-trained model -->
  <!-- - SSD MobileNet V2 model -->

## Installation

To install this project, please follow these steps:

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

<!-- # ssd-mobilenet-v2-tensorflow2-fpnlite-320x320-v1.tar -->
<!-- 4. Download the [SSD MobileNet V2 TensorFlow 2 model](https://tfhub.dev/tensorflow/ssd_mobilenet_v2/fpnlite_320x320/1) and extract the files into `app/models/pretrained_model/`. -->
   <!-- - Ensure the directory contains files like `saved_model.pb` and the `saved_model` folder. -->

## Usage

To run this project:

1. Run the main application:

   ```sh
   python app/main.py
   ```

2. The system will launch the webcam, and start detecting objects in real-time.
3. Use voice commands or keyboard shortcuts to interact with the system.

Voice Commands:

<!-- | Voice Command        | Description                         |
| -------------------- | ----------------------------------- |
| Detect [Object Name] | Detect specific objects             |
| Stop [Object Name]   | Stop detecting specific objects     |
| Save [Object Name]   | Save a snapshot of detected objects |
| Help                 | List available commands             |
| Exit                 | Exit the program                    | -->

- "**Detect [Object Name]**": Detect specific objects (e.g., "Detect car").
- "**Stop [Object Name]**": Stop detecting specific objects (e.g., "Stop car").
- "**Save [Object Name]**": Save a snapshot of specific detected objects (e.g., "Save car").
- "**Help**": List available commands.
- "**Exit**": Exit the program.
<!-- - "**Detect**": Detect all objects in the model.
- "**Stop**": Stop detecting all objects.
- "**Alert**": Generate an alert sound when all objects are detected.
- "**Alert [Object Name]**": Generate an alert sound when specific objects are detected (e.g., "Alert person").
- "**Save**": Save a snapshot of all detected objects. -->

Keyboard Shortcuts:

<!-- | Keyboard Shortcut | Action                                |
| ----------------- | ------------------------------------- |
| 's'               | Save a snapshot with detected objects |
| 'd'               | Detect specific objects               |
| 'h'               | List available commands               |
| 'Esc'             | Exit the program                      | -->

- **Press 's'**: to save a snapshot with detected objects.
- **Press 'd'**: to detect specific objects.
- **Press 'Esc'**: to exit the program.
  <!-- - **Press 'h'**: to list available commands. -->
  <!-- - **Press 'a'**: to generate an alert sound when specific objects are detected. -->

The system adapts to user preferences over time based on input voice command history, improving accuracy and user experience.

<!-- ## Web Version

A browser-based demo is also available. **Requirements:**

- A modern web browser (Chrome, Edge, Firefox, or Safari)
- Webcam access permission (the browser will prompt you)
- The page must be served via `localhost` or HTTPS for webcam access

To try the web version, open `app/web/index.html` (or `index0.html`) in your browser, and click **Start** to begin real-time object detection directly in your browser—no installation required! -->

## Customization

<!-- You can customize the system's behavior by modifying the configuration settings in the config.yaml file: -->

The system's behavior can be customized by modifying the default settings in the `config.py` file:

- **Target Object Settings**: Define which objects you want to detect.
- **Alert Settings**: Adjust sound alert thresholds and preferences.
- **Voice Command History**: Configure how the system adapts to voice command history.

## Contributing

For contributions, please follow these steps:

1.  Fork the repository
2.  Create a new branch (`git checkout -b feature-branch`)
3.  Commit your changes (`git commit -m "Added new feature"`)
4.  Push to the branch (`git push origin feature-branch`)
5.  Submit a pull request

## License

- This project is licensed under the [MIT License](LICENSE).

## Contact

We welcome any feedback, suggestions, or contributions to this project. For any inquiries, please contact us at:

- **Email**: ocrtech.mail@gmail.com
- **Website**: [https://ocr-tech.github.io/AdaptDL](https://ocr-tech.github.io/AdaptDL/)
- **GitHub**: [https://github.com/OCR-tech](https://github.com/OCR-tech)
