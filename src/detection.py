import tensorflow as tf
import numpy as np
import cv2

class ObjectDetector:
    def __init__(self, model_path):
        self.model = tf.saved_model.load(model_path)

    def detect(self, frame):
        input_tensor = tf.convert_to_tensor(frame)
        input_tensor = input_tensor[tf.newaxis, ...]
        detections = self.model(input_tensor)

        # Process detections
        for i in range(int(detections.pop('num_detections'))):
            box = detections['detection_boxes'][0][i].numpy()
            score = detections['detection_scores'][0][i].numpy()
            class_id = int(detections['detection_classes'][0][i].numpy())

            if score > 0.5:  # Confidence threshold
                h, w, _ = frame.shape
                ymin, xmin, ymax, xmax = box
                (left, top, right, bottom) = (xmin * w, ymin * h, xmax * w, ymax * h)
                cv2.rectangle(frame, (int(left), int(top)), (int(right), int(bottom)), (0, 255, 0), 2)
                cv2.putText(frame, f"Class {class_id}: {score:.2f}", (int(left), int(top) - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        return frame