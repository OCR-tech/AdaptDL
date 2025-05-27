# Import necessary modules
import cv2
import os
from src.config.configs import *


# //===========================================//
# def call_detector(imagepath, videopath, configpath, modelpath, classespath):
#     from video_processing.object_detection import detector

#     print('//==== call_detector ===//')
#     # if not stop_event.is_set():
#     detect = detector(imagepath, videopath, configpath, modelpath, classespath)
#     detect.onVideo()
#     # detect.onImage()

# //===========================================//
# def call_voice_input():
#     from voice_processing.voice_input import listen_for_commands

#     print('//==== call_voice_input ===//')
#     listen_for_commands()

# //===========================================//
# def load_config():
#     print("load_config")
#     # Load the configuration file
#     with open("src/config.yaml", "r") as file:
#         return yaml.safe_load(file)



def main():
    '''
    Main function to initialize the system and listen for voice commands.
    '''

    # Initialize the system
    from src.voice_processing.voice_input import listen_for_commands
    from src.video_processing.object_detection import detector
    from src.voice_processing.voice_output import speak

    # This function is the entry point of the application.
    print("//*** main ***//")

    # //================================//
    # print('//=== load config ===//')
    # config = load_config()

    # # Load configurations
    # model_path = config["model_settings"]["model_path"]
    # object_detector = ObjectDetector(model_path)


    # //================================//
    # Create a threading Event
    # stop_event = threading.Event()

    # Create threads with arguments
    # thread1 = threading.Thread(target=call_detector, args=(imagepath, videopath, configpath, modelpath, classespath))
    # thread2 = threading.Thread(target=call_voice_input, args=())

    # Start the threads
    # thread1.start()
    # thread2.start()

    # Wait for both threads to finish
    # thread1.join()qq
    # thread2.join()
    # print("Both tasks completed.")

    # //================================//
    # detect = detector(imagepath, videopath, configpath, modelpath, classespath)
    # detect.onVideo()
    # # detect.onImage()

    # # //================================//
    # command = ""
    # while command != "exit":
    #     command = listen_for_commands()
    #     print('command := ', command)
    #     command = "start"

    #     if command == "start":
    #         print('//=== ok ===//')
    #         speak("ok")
    #         detect = detector(imagepath, videopath, configpath, modelpath, classespath)
    #         detect.onVideo()
    #         # detect.onImage()



    # The main loop to continuously listen for voice commands and process them
    while True:
        # Initialize the system
        # speak("System initialized. Please provide a command.")
        # print("System initialized. Please provide a command.")
        # speak("listening for command ...")
        # print("listening for command ...")

        # Listen for voice commands
        # command = listen_for_commands()
        # command = "exit"
        command = "start"
        # command = "help"

        print(f"Voice Command: {command}")
        # speak(command)


        # Process the command
        if command:
            if command == "exit":
                print("Resources released. Exiting the program.")
                speak("exiting the system.")
                cv2.destroyAllWindows()
                os._exit(1)
            elif command == "start":
                print("Start the system.")
                # speak("Start the system.")
                detect = detector(imagepath, videopath, configpath, modelpath, classespath)

                # Uncomment the following line to process for image or video input
                detect.onVideo()
                # detect.onImage()

            elif command == "help":
                print("Available commands: start, help, exit")
                speak("Available commands: start, help, exit")


if __name__ == '__main__':
    main()  # Call the main function to start the application
