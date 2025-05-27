# Import necessary modules
import cv2
import os
# import sys
# import argparse
from src.config.configs import *


# //===========================================//
# def parse_arguments():

#     parser = argparse.ArgumentParser(description="Example script using argparse.")
#     parser.add_argument('--config', type=str, help='Path to config file')
#     parser.add_argument('--device', type=str, default='cpu', help='Device to use (cpu/gpu)')
#     parser.add_argument('--input', type=str, help='Input source (image/video)')
#     parser.add_argument('--threshold', type=float, default=0.5, help='Detection threshold')
#     args = parser.parse_args()

#     print("Config file:", args.config)
#     print("Device:", args.device)
#     print("Input source:", args.input)
#     print("Threshold:", args.threshold)

#     # Example usage in your code
#     if args.input:
#         print(f"Processing input: {args.input} on device: {args.device}")
#     else:
#         print("No input source provided.")
#     return args





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


    # # Parse command line arguments
    # args = parse_arguments()
    # config = args.config
    # device = args.device
    # input_source = args.input
    # threshold = args.threshold
    # print(f"Parsed arguments: config={config}, device={device}, input_source={input_source}, threshold={threshold}")



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
    main()  # Call the main function to start the application
