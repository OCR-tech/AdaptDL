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



def process_voice_commands(voice_command_processor, detections):
    """Thread function to process voice commands."""
    while True:
        command = voice_command_processor.listen()
        if command:
            voice_command_processor.execute_command(command, detections)



def load_config():
    with open("src/config.yaml", "r") as file:
        return yaml.safe_load(file)

def main():

    print("//==============================================================//")
    config = load_config()

    # Load configurations
    confidence_threshold = config["model_settings"]["confidence_threshold"]
    nms_threshold = config["model_settings"]["nms_threshold"]
    input_size = config["model_settings"]["input_size"]




    # Initialize video stream
    video_source = config["video_stream"]["source"]
    video_stream = VideoStream(video_source)
    video_width = config["video_stream"]["width"]   
    video_height = config["video_stream"]["height"]
    video_fps = config["video_stream"]["fps"]
    # video_stream = config["video_stream"]["stream"]
    print("Video source:", video_source)
    print("Video width:", video_width)
    print("Video height:", video_height)
    print("Video FPS:", video_fps)
    # print("Video stream:", video_stream)
    print("//====================================//")
    print("Initializing video stream...")
    video_stream = VideoStream()
    video_stream.start()
    print('video_stream:', video_stream)
    # video_stream.start(video_source, video_width, video_height, video_fps, video_stream)
    print("Video stream initialized.")




    # Initialize object detector
    print("//====================================//")
    print("Initializing object detector...")
    model_path = config["model_settings"]["model_path"]
    object_detector = ObjectDetector(model_path)
    print("Object detector model path:", model_path)
    # print("Object detector initialized.")

    object_detector = ObjectDetector(model_path)

    # Queues for frame and detection sharing
    frame_queue = queue.Queue(maxsize=1)
    detection_queue = queue.Queue(maxsize=1)


    # Start object detection thread
    detection_thread = threading.Thread(target=object_detection_thread, args=(object_detector, frame_queue, detection_queue))
    detection_thread.daemon = True
    detection_thread.start()



    # Initialize voice command processor
    print("//====================================//")
    print("Initializing voice command processor...")
    # voice_command_model = config["voice_command"]["model"]
    # voice_command_language = config["voice_command"]["language"]
    # voice_command_threshold = config["voice_command"]["threshold"]
    # print("Voice command model:", voice_command_model)
    # print("Voice command language:", voice_command_language)
    # print("Voice command threshold:", voice_command_threshold)
    # print("Voice command processor initialized.")
    # print("Voice command processor model:", voice_command_model)
    # print("Voice command processor language:", voice_command_language)
    # print("Voice command processor threshold:", voice_command_threshold)
    # print("Voice command processor initialized.")
    voice_command_processor = VoiceCommandProcessor()
    # Start a separate thread for voice command processing
    voice_thread = threading.Thread(target=process_voice_commands, args=(voice_command_processor, None))
    voice_thread.daemon = True  # Ensure the thread exits when the main program exits
    voice_thread.start()
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
            


        # Get the video stream properties
        video_width = video_stream.get_width()
        video_height = video_stream.get_height()
        # video_width = frame.shape[0]
        # video_height = frame.shape[1]

        video_fps = video_stream.get_fps()
        # video_stream_source = video_stream.get_source()
        # video_stream_stream = video_stream.get_stream()
        print("//====================================//")
        # print("Video stream source:", video_stream_source)
        # print("Video stream stream:", video_stream_stream)
        print("Video stream width:", video_width)
        print("Video stream height:", video_height)
        print("Video stream fps:", video_fps)
        print("Video stream properties:")



        print("Processing frame...")
        # Resize the frame to the desired size
        frame = cv2.resize(frame, (video_width, video_height))
        # Convert the frame to the desired format (e.g., RGB)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        # Normalize the frame if required
        # frame = (frame - config["model_settings"]["mean"]) / config["model_settings"]["scale"]
        # Swap the channels if required
        # if config["model_settings"]["swapRB"]:
        #     frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        # Crop the frame if required
        # if config["model_settings"]["crop"]:
        #     frame = frame[y:y+h, x:x+w]
        # Flip the frame if required
        # if config["model_settings"]["flip"]:
        #     frame = cv2.flip(frame, 1)
        # Rotate the frame if required
        # if config["model_settings"]["rotate"]:
        #     frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
        # Normalize the frame if required
        # if config["model_settings"]["normalize"]:
        #     frame = (frame - config["model_settings"]["mean"]) / config["model_settings"]["scale"]
        # Preprocess the frame if required
        # if config["model_settings"]["preprocess"]:
        #     frame = preprocess(frame)
        # Postprocess the frame if required
        # if config["model_settings"]["postprocess"]:
        #     frame = postprocess(frame)
        # Prepare the frame for the model input
        # frame = cv2.resize(frame, (video_width, video_height))
        # frame = frame.astype(config["model_settings"]["input_dtype"])
        # frame = np.expand_dims(frame, axis=0)
        # frame = np.array(frame, dtype=config["model_settings"]["input_dtype"])
        # frame = np.array(frame, dtype=np.float32)
        # frame = np.array(frame, dtype=np.uint8)
        # frame = np.array(frame, dtype=np.int8)
        # frame = np.array(frame, dtype=np.uint16)
        # frame = np.array(frame, dtype=np.int16)
        # frame = np.array(frame, dtype=np.uint32)  

        # Detect objects in the frame
        detections = object_detector.detect(frame)
        # detections = object_detector.detect(frame, confidence_threshold, nms_threshold, input_size)
        # detections = object_detector.detect(frame, confidence_threshold, nms_threshold, input_size, classes, anchors, colors, mean, scale, swapRB, crop, flip, rotate, normalize, preprocess, postprocess)
        # detections = object_detector.detect(frame, confidence_threshold, nms_threshold, input_size, classes, anchors, colors, mean, scale, swapRB, crop, flip, rotate, normalize, preprocess, postprocess, input_name, output_name, input_shape, output_shape, input_dtype, output_dtype, input_scale, output_scale, input_offset, output_offset, input_mean, output_mean, input_std, output_std)
        # print("Detections:", detections)



        # Draw bounding boxes and labels on the frame

        # for detection in detections:
        #     x, y, w, h, label, confidence = detection
        #     cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        #     cv2.putText(frame, f"{label}: {confidence:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            # cv2.putText(frame, f"{label}: {confidence:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        print("Detections drawn on frame.")
        cv2.imshow("Object Detection", detections)
        # cv2.imshow("Object Detection", detections)



        # Process voice commands
        print("//====================================//")
        print("Listening for voice commands...")         
        command = voice_command_processor.listen()
        # command = voice_command_processor.listen(voice_command_model, voice_command_language, voice_command_threshold)
        # command = voice_command_processor.listen(voice_command_model, voice_command_language, voice_command_threshold, video_stream_source, video_stream_stream)
        # command = voice_command_processor.listen(voice_command_model, voice_command_language, voice_command_threshold, video_stream_source, video_stream_stream, video_width, video_height, video_fps)
        
        print("Command:", command)  
        if command:
            voice_command_processor.execute_command(command, detections)


        # Display the frame with detections
        print("Displaying frame with detections...")
        cv2.imshow("Object Detection", detections)


        # Break the loop on 'Esc' key press
        if cv2.waitKey(1) & 0xFF == 27:
            break



    # Release resources
    print("//====================================//")
    print("Releasing resources...")
    video_stream.stop()
    cv2.destroyAllWindows()
    print("Resources released.")
    print("//==============================================================//")




if __name__ == "__main__":
    main()