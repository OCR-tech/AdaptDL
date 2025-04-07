# AdaptDL: Real-Time Object Detection with Voice Commands

**AdaptDL** is a Python-based real-time object detection system using deep learning with voice commands for surveillance systems. 

&emsp;&emsp;The system detects target objects from a webcam in real-time using the YOLOv5 model, and overlays bounding boxes and labels on the detected objects in the video stream. It features functionality based on user-input voice commands, including selecting target objects, saving snapshots, and generating sound alerts. The system features with user preferences adaptability based on voice command history and can handle challenging environments. 

<!-- &emsp;&emsp;YOLOv5 is a state-of-the-art object detection model that is capable of detecting multiple objects in real-time. This model is designed to be fast and efficient, making it suitable for applications such as surveillance systems, autonomous vehicles, and robotics. -->

<br/>
<p align="center">
<img src="docs/img/img1a.png" style="width:45%; height:auto;">&emsp;
</p>


## Features

- **Real-time Object Detection**: Detects objects in live video captured from a webcam using YOLOv5 model.
- **Bounding Boxes and Labels**: Overlays bounding boxes and labels on the detected objects in the video stream.
- **Voice Command Control**: Users can interact with the system through voice commands:
  - Select target objects.
  - Save snapshots of detected objects.
  - Generate sound alerts based on detection.
- **Adaptability**: The system adapts to user preferences and improves based on input voice command history and environmental challenges.


## Requirements

Before running this project, install the following dependencies:

- Python 3.11 or higher
- Tensorflow 2.18 or higher
- SSD MobileNet V2 model
- OpenCV for video capturing and processing
- SpeechRecognition for voice command processing
- Pyaudio (optional, depending on your microphone setup)

## Installation
To install this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

<!-- 2. Create a virtual environment:

    ```bash
    python -m venv .venv
    .venv\Scripts\activate      # for Windows                    
    ``` -->

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Download the TensorFlow object detection model and place it in `models pretrained_model/saved_model`.

    ```bash
    https://www.kaggle.com/models/tensorflow/ssd-mobilenet-v2/tensorFlow2   # ssd-mobilenet-v2-tensorflow2-fpnlite-320x320-v1.tar
    ```



## Usage

Run the application:

```bash
python src/main.py
```

This will launch the webcam, where the system will start detecting objects in real-time. You can use voice commands to interact with the system.

Available Voice Commands:
- "**Detect [Object Name]**": Detect specific objects (e.g., "Detect car").
- "**Save Snapshot**": Save a snapshot of the currently detected objects.
- "**Alert**": Generate an alert sound when certain objects are detected.

Keyboard Shortcuts:
- **Press 's'**: to save a snapshot with detected objects.
- **Press 'Esc'**: to exit the program.

The system adapts to user preferences over time based on input voice command history, improving accuracy and user experience.

## Customization
You can customize the system's behavior by modifying the configuration settings in the config.yaml file:
- **Target Object Settings**: Define which objects you want to detect.
- **Alert Settings**: Adjust sound alert thresholds and preferences.
- **Voice Command History**: Configure how the system adapts to voice command history.



## Contributing
Please follow these steps:
1.  Fork the repository
2.  Create a new branch (`git checkout -b feature-branch`)
3.  Commit your changes (`git commit -m "Added new feature"`)
4.  Push to the branch (`git push origin feature-branch`)
5.  Submit a pull request


## License
- This project is licensed under [MIT License](https://github.com/OCR-tech/CubeOCR/blob/main/LICENSE).


## Acknowledgments
<!-- - **YOLOv5**: This project uses the YOLOv5 object detection model from [YOLOv5 GitHub](https://github.com/ultralytics/yolov5). -->
<!-- - **ABC**: For training YOLOv5 on a custom dataset from [Datasets](https://github.com/ultralytics/yolov5). -->
- **SpeechRecognition**: For voice command processing.
- **OpenCV**: For video capturing and processing.

## Contact
If you have any questions or need further assistance, please open an issue on GitHub or contact us at ocrtech.mail@gmail.com.
