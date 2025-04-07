from module.voice_processing.voice_input import listen_for_commands
from module.voice_processing.voice_output import speak
import cv2
import os

# from config import imagepath, videopath
# from config import configpath, modelpath, classespath
from utils.config import *



# //===========================================//
# def call_detector(imagepath, videopath, configpath, modelpath, classespath):
#     from video_processing.object_detection import detector

#     print('//==== call_detector ===//')
#     # if not stop_event.is_set():
#     detect = detector(imagepath, videopath, configpath, modelpath, classespath)
#     detect.onVideo()
#     # detect.onImage()


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



#//==================================//
def main():

    print("//**************************** main ****************************//")
    from module.voice_processing.voice_input import listen_for_commands
    from module.video_processing.object_detection import detector
    from module.voice_processing.voice_output import speak


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
    # thread1.join()
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




    # # //================================//
    while True:
        # speak("System initialized. Please provide a command.")
        print("listening for command ...")
        # speak("listening for command ...")

        # command = listen_for_commands()
        # command = "exit"
        command = "start"
        # command = "help"
        
        print(f"Voice Command: {command}")
        speak(command)

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
                detect.onVideo()
                # detect.onImage()
            elif command == "help":
                print("Available commands: start, help, exit")
                speak("Available commands: start, help, exit")



# //================================//
if __name__ == '__main__':
    main()
