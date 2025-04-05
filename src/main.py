import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import cv2
from detection import ObjectDetector
from voice_commands import VoiceCommandProcessor
from utils.video_stream import VideoStream
import yaml
import threading
import queue

# Other imports remain the same...

def object_detection_thread(object_detector, frame_queue, detection_queue):
    """Thread function to perform object detection."""
    while True:
        if not frame_queue.empty():
            frame = frame_queue.get()
            detections = object_detector.detect(frame)
            detection_queue.put((frame, detections))

def load_config():
    with open("src/config.yaml", "r") as file:
        return yaml.safe_load(file)
    


def main():
    print("//==============================================================//")
    config = load_config()

    # Load configurations
    print("Loading configurations...")
    # confidence_threshold = config["model_settings"]["confidence_threshold"]
    # nms_threshold = config["model_settings"]["nms_threshold"]
    input_size = config["model_settings"]["input_size"]

    # Initialize video stream
    print("Initializing video stream...")
    video_source = config["video_stream"]["source"]
    video_stream = VideoStream(video_source)
    video_stream.start()
    print("Video stream initialized.")

    # Initialize object detector
    print("Initializing object detector...")

    # Load the model path from the configuration
    model_path = config["model_settings"]["model_path"]
    object_detector = ObjectDetector(model_path)

    # Queues for frame and detection sharing
    print("Initializing queues...")
    frame_queue = queue.Queue(maxsize=1)
    detection_queue = queue.Queue(maxsize=1)

    # Start object detection thread
    print("Starting object detection thread...")
    detection_thread = threading.Thread(target=object_detection_thread, args=(object_detector, frame_queue, detection_queue))
    detection_thread.daemon = True
    detection_thread.start()




    # # //=======================================//
    # # Process voice commands
    # voice_command_processor = VoiceCommandProcessor()
    # command = voice_command_processor.process_command()
    # if command == "exit":
    #     print("Exiting...")
    #     video_stream.stop()
    #     return
    # elif command == "pause":
    #     print("Pausing...")
    #     # Implement pause functionality here
    # elif command == "resume":
    #     print("Resuming...")
    #     # Implement resume functionality here
    # elif command == "restart":
    #     print("Restarting...")
    #     # Implement restart functionality here
    # elif command == "capture":
    #     print("Capturing frame...")
    #     # Implement capture functionality here
    # elif command == "save":
    #     print("Saving frame...")
    #     # Implement save functionality here
    # elif command == "record":
    #     print("Recording video...")
    #     # Implement record functionality here
    # elif command == "stop":
    #     print("Stopping recording...")
    #     # Implement stop functionality here
    # elif command == "play":
    #     print("Playing video...")
    #     # Implement play functionality here
    # elif command == "pause_recording":
    #     print("Pausing recording...")
    #     # Implement pause recording functionality here
    # elif command == "resume_recording":
    #     print("Resuming recording...")
    #     # Implement resume recording functionality here





    # Main loop to process video frames and perform detection
    while True:
        # Get a frame from the video stream
        frame = video_stream.get_frame()
        if frame is None:
            break

        # Resize the frame for faster processing
        frame_resized = cv2.resize(frame, (input_size[0], input_size[1]))

        # Add the frame to the queue for detection
        if frame_queue.empty():
            frame_queue.put(frame_resized)

        # Get detections from the detection queue
        if not detection_queue.empty():
            frame_with_detections, detections = detection_queue.get()
            cv2.imshow("Object Detection", frame_with_detections)

        # Break the loop on 'Esc' key press
        if cv2.waitKey(1) & 0xFF == 27:
            break




    # Release resources
    video_stream.stop()
    cv2.destroyAllWindows()
    print("Resources released.")
    print("//==============================================================//")

if __name__ == "__main__":
    main()