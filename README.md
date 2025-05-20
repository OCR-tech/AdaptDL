# AdaptDL: Real-Time Object Detection with Voice Commands

**AdaptDL** is a Python-based real-time object detection system using deep learning with voice commands for surveillance applications.

The system detects target objects from a webcam in real-time using the deep learning model, and overlays bounding boxes and labels on the detected objects in the video stream. It features functionality based on user-input voice commands, including selecting target objects, saving snapshots, and generating sound alerts. The system features with user preferences adaptability based on voice command history and can handle challenging environments.

<br/>
<p align="center">
<img src="docs/img/img1a.png" style="width:45%; height:auto;">&emsp;
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

- Python 3.11 or higher
- Tensorflow 2.18 or higher
<!-- - SSD MobileNet V2 model -->
- OpenCV 4.11 or higher (for video capturing and processing)
- SpeechRecognition 3.14 or higher (for voice command processing)
- Pyaudio 0.2 or higher (for microphone setup)

## Installation

To install this project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/OCR-tech/AdaptDL.git
   cd AdaptDL
   ```

2. Create a virtual environment:

   ```sh
   python -m venv .venv
   .venv\Scripts\activate
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
3. Use voice commands to interact with the system.

Available Voice Commands:

- "**Detect [Object Name]**": Detect specific objects (e.g., "Detect car").
- "**Stop [Object Name]**": Stop detecting specific objects (e.g., "Stop detecting car").
- "**Alert [Object Name]**": Generate an alert sound when specific objects are detected (e.g., "Alert person").
- "**Save [Object Name]**": Save a snapshot of specific detected objects (e.g., "Save snapshot car").
- "**Detect**": Detect all objects in the model.
- "**Stop**": Stop detecting all objects.
- "**Alert**": Generate an alert sound when all objects are detected.
- "**Save**": Save a snapshot of all detected objects.
- "**Help**": List available commands.
- "**Exit**": Exit the program.

Keyboard Shortcuts:

- **Press 's'**: to save a snapshot with detected objects.
- **Press 'a'**: to generate an alert sound when specific objects are detected.
- **Press 'd'**: to detect specific objects.
- **Press 'h'**: to list available commands.
- **Press 'Esc'**: to exit the program.

The system adapts to user preferences over time based on input voice command history, improving accuracy and user experience.

## Customization

You can customize the system's behavior by modifying the configuration settings in the config.yaml file:

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

- This project is licensed under [MIT License](https://github.com/OCR-tech/AdaptDL/blob/main/LICENSE).

## Acknowledgments

<!-- - **YOLOv5**: This project uses the YOLOv5 object detection model from [YOLOv5 GitHub](https://github.com/ultralytics/yolov5). -->
<!-- - **ABC**: For training YOLOv5 on a custom dataset from [Datasets](https://github.com/ultralytics/yolov5). -->

- **SpeechRecognition**: For voice command processing.
- **OpenCV**: For video capturing and processing.

## Contact

We welcome any feedback, suggestions, or contributions to this project. For any inquiries, please contact us at:

<!-- - **Name**: OCR-tech -->

- **Email**: ocrtech.mail@gmail.com
- **Website**: [https://ocr-tech.github.io/AdaptDL](https://ocr-tech.github.io/AdaptDL/)
- **GitHub**: [https://github.com/OCR-tech](https://github.com/OCR-tech)
