import speech_recognition as sr
import threading
import cv2


class VoiceCommandProcessor:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.lock = threading.Lock()  # Add a lock to prevent concurrent access


    # def listen(self):
    #     try:
    #         with self.microphone as source:
    #             print("Listening for voice commands...")
    #             audio = self.recognizer.listen(source)
    #         command = self.recognizer.recognize_google(audio)
    #         print(f"Command received: {command}")
    #         return command.lower()
    #     except sr.UnknownValueError:
    #         print("Could not understand the audio.")
    #     except sr.RequestError as e:
    #         print(f"Error with the speech recognition service: {e}")
    #     return None
    
    def listen(self):
        with self.lock:  # Ensure only one thread accesses the microphone at a time
            with self.microphone as source:
                print("Listening for voice commands...")
                self.recognizer.adjust_for_ambient_noise(source)
                try:
                    audio = self.recognizer.listen(source, timeout=5)
                    command = self.recognizer.recognize_google(audio)
                    print(f"Recognized command: {command}")
                    return command
                except sr.UnknownValueError:
                    print("Could not understand the audio.")
                except sr.RequestError as e:
                    print(f"Could not request results; {e}")
                except sr.WaitTimeoutError:
                    print("Listening timed out.")
        return None



    # def execute_command(self, command, detections):
    #     # Implement command execution logic here
    #     print(f"Executing command: {command}")


    def execute_command(self, command, detections):
        if "save snapshot" in command:
            cv2.imwrite("snapshot.jpg", detections)
            print("Snapshot saved.")
        elif "alert" in command:
            print("Alert triggered!")
