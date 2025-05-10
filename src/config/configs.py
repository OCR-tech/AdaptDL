import cv2
import os




# //=======================================//
# image = "pic1a.jpg"
# image = "pic2a.jpg"
image = "pic3a.jpg"

video = "street1.mp4"      # street        # 3840x2160    24fps
# video = "street2.mp4"     # bike          # 1920x1080    30fps
# video = "street3.mp4"     # bike/night    # 1920x1080    30fps


# //=======================================//
# path = 'D:/dataset/'
path = './resources/'


# //=======================================//
imagepath = path + 'image/' + image
imagepath = "-"
videopath = path + 'video/' + video

# print("imagepath := ", imagepath)
# print("videopath := ", videopath)


# //=======================================//
# s = "http://192.168.30.139:4747/video"
# s = "http://192.168.30.139:8080/video"
# s = 0
# s = 1
s = videopath





#//==================================//
configpath = os.path.join("models/saved_model", "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt")
modelpath = os.path.join("models/saved_model", "frozen_inference_graph.pb")
classespath = os.path.join("models/saved_model", "coco.names")

# classespath = os.path.join("models/saved_model", "coco_class_labels.txt")
# configpath = os.path.join("models/saved_model", "ssd_mobilenet_v2_coco_2018_03_29.pbtxt")
# modelpath = os.path.join("models/saved_model", "ssd_mobilenet_v2_coco_2018_03_29", "frozen_inference_graph.pb")





# //=======================================//
FONT_SIZE_FPS = 0.8
FONT_SIZE_TXT = 0.7
FONT_SIZE_OBJ = 0.5

FONT_COLOR_FPS = (0,255,0)
FONT_COLOR_TXT = (0,255,0)
FONT_COLOR_OBJ = (255,0,255)

FONT_THICKNESS_FPS = 2
FONT_THICKNESS_TXT = 1
FONT_THICKNESS_OBJ = 1

FONT_FPS = cv2.FONT_HERSHEY_SIMPLEX
FONT_TXT = cv2.FONT_HERSHEY_DUPLEX
FONT_OBJ = cv2.FONT_HERSHEY_COMPLEX

# FONT_TXT = cv2.FONT_HERSHEY_SIMPLEX
# FONT_TXT = cv2.FONT_HERSHEY_COMPLEX
# FONT_TXT = cv2.FONT_HERSHEY_PLAIN
# FONT_TXT = cv2.FONT_HERSHEY_DUPLEX





# //=======================================//
# model_settings:
#   model_path: "models/pretrained_model/saved_model" # Path to the saved model
#   confidence_threshold: 0.5                         # Confidence threshold for detections
#   nms_threshold: 0.4                                # Non-Maximum Suppression (NMS) threshold
#   # input_size: [320, 320]                            # Input size for the model (width, height)
#   input_size: [640, 480]                            # Input size for the model (width, height)
#   labels: "models/pretrained_model/labels.txt"      # Path to the labels file (if applicable)

# video_stream:
#   source: 0                                         # Video source (0 for webcam, or path to video file)
#   width: 640                                        # Width of the video stream
#   height: 480                                       # Height of the video stream
#   fps: 30                                           # Frames per second

# voice_command:
#   language: "en-US"                                 # Language for voice recognition
#   sensitivity: 0.8                                  # Sensitivity for voice commands