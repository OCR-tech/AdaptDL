import speech_recognition as sr
from utils.voice_processing.voice_output import speak
import threading


# Create a lock for thread-safe access to the engine
engine_lock = threading.Lock()


def listen_for_commands():
    with engine_lock:
            
        recognizer = sr.Recognizer()
        microphone = sr.Microphone()
        
        with microphone as source:

            # print("listening for command ...")
            # speak("listening for command ...")
            recognizer.adjust_for_ambient_noise(source)
            # audio = recognizer.listen(source)
            # audio = recognizer.listen(source, timeout=2, phrase_time_limit=3)
            # audio = recognizer.listen(source, timeout=1)
            audio = recognizer.listen(source, timeout=3, phrase_time_limit=3, stream=False) 
            
            #  def _listen(self, source, timeout=None, phrase_time_limit=None, snowboy_configuration=None, stream=False):

            try:
                command = recognizer.recognize_google(audio, language="en-US")
                print(f"command: {command}")
                # speak("ok")
                return command.lower()
            except sr.UnknownValueError:
                print("unknown")
                return None
            except sr.WaitTimeoutError:
                print("timeout")  
                return None
            except sr.RequestError:
                print("error")
                return None
            except Exception as e:
                print("error: ", str(e))   







def stop_listening():
    """Stop listening for voice commands."""
    print("//=======stop_listening========//")
    # Stop listening logic here if needed
    pass


def process_command():
    """Process the recognized voice command."""
    print("//=======process_command========//")

    # command = listen()
    # if command:
    #     print(f"Voice Command: {command}")
    #     return command.lower()
    # return None


def process_voice_commands(command):
    """Process the recognized voice command."""
    print("//=======process_voice_commands========//")

    if command:
        print(f"Processing command: {command}")
        # Here you can add logic to process the command and execute actions
        # For example, you can check if a specific command is recognized and execute it.
        # Example: if "capture" in command:   
        #     self.execute_command("capture", detections)
    else:
        print("No command recognized.") 



def process_detections(detections):
    """Process the detected objects and execute commands based on voice input."""
    print("//=======process_detections========//")
    if detections:
        print(f"Detected objects: {detections}")
        # Here you can add logic to process detections and execute commands
        # For example, you can check if a specific object is detected and execute a command
        # based on that.
        # Example: if "person" in detections:   
        #     self.execute_command("alert", detections)
    else:
        print("No objects detected.")



def execute_command(command, detections, video_stream):
    """Execute the command based on the recognized voice command."""
    print(f"Executing command: {command}")

    # # Implement command execution logic here
    # if command == "exit":
    #     print("Exiting...")
    #     print('video_stream := ', video_stream)

    #     # if video_stream:
    #     # if cv2.getWindowProperty('image', cv2.WND_PROP_VISIBLE) >= 1:
    #     #     cv2.destroyAllWindows()  # Close all OpenCV windows

    #     print("Resources released. Exiting the program.")
    #     video_stream.release()  # Release the video stream if applicable
    #     cv2.destroyAllWindows()  # Close all OpenCV windows
    #     sys.exit(0)  # Exit the program with a success status
    #     # cv2.destroyAllWindows()  # Close all OpenCV windows