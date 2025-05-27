# Import necessary modules
import cv2
import os
from src.config.configs import *




# //===========================================//
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



    # # //================================//
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
    main()
