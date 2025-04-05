# This module provides a class to handle video streaming from a camera or video file.
# It uses OpenCV to capture video frames and provides methods to start, stop, and retrieve frames from the stream.

import cv2

class VideoStream:
    def __init__(self, source=0):
        self.stream = cv2.VideoCapture(source)
        self.width = int(self.stream.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.height = int(self.stream.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self.fps = int(self.stream.get(cv2.CAP_PROP_FPS))

    def start(self):
        if not self.stream.isOpened():
            self.stream.open()

    def get_frame(self):
        ret, frame = self.stream.read()
        return frame if ret else None

    def get_width(self):
        return self.width

    def get_height(self):
        return self.height

    def get_fps(self):
        return self.fps

    def stop(self):
        self.stream.release()





# class VideoStream:
#     def __init__(self, src=0):
#         self.stream = cv2.VideoCapture(src)

#     def start(self):
#         if not self.stream.isOpened():
#             raise RuntimeError("Failed to open video stream.")

#     def get_frame(self):
#         ret, frame = self.stream.read()
#         if not ret:
#             return None
#         return frame

#     def stop(self):
#         self.stream.release()
