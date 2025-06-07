# Import necessary modules
import os
import sys
import cv2
import tkinter as tk
from tkinter import messagebox
from src.config.configs import *


# //===========================================//
def main():
    '''
    Main function to initialize the system and listen for voice commands.
    '''

    # Initialize the system
    from src.gui.gui_window import WindowMainGUI
    from src.voice_processing.voice_input import listen_for_commands
    from src.video_processing.object_detection import detector
    from src.voice_processing.voice_output import speak

    # This function is the entry point of the application.
    print("=== main ===")

    # Check if the paths are valid
    if not ((os.path.exists(imagepath)) or "-") or not (os.path.exists(videopath)) or not (os.path.exists(configpath))  or not (os.path.exists(modelpath)) or not (os.path.exists(classespath)):
        # print("Invalid system paths.")
        os._exit(1)
    else:
        # print("Valid system paths")
        pass

        # Initialize GUI
        sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
        detector_gui = detector(imagepath, videopath, configpath, modelpath, classespath)
        root = tk.Tk()
        app = WindowMainGUI(root, detector_gui, speak)

        # Speak the initialization message
        # speak("System initialized.")
        # print("System initialized.")

        # Set window properties
        root.title("AdaptDL")
        # root.geometry("1200x1000")

        # Set window position to center of the screen
        screen_width = root.winfo_screenwidth()
        screen_height = root.winfo_screenheight()
        x = (screen_width // 2) - (1200 // 2)
        y = (screen_height // 2) - (850 // 2) - 50  # Adjust for title bar height
        root.geometry(f"1200x850+{x}+{y}")

        # root.resizable(False, False)
        root.resizable(True, True)
        root.minsize(1025, 850)
        root.configure(bg="#2c3e50")
        root.grid_rowconfigure(0, weight=1)
        root.grid_columnconfigure(0, weight=1)

        # Start the GUI main loop
        root.mainloop()



if __name__ == '__main__':
    main()
