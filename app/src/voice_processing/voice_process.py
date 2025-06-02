# Importing necessary libraries
from voice_processing.voice_output import speak  # Import the speak function for voice output


#//==================================//
class voice_processing:
    """
    A class for processing voice commands and generating appropriate responses.
    """

    def __init__(self, data):
        """
        Initialize the voice_processing class.
        """
        self.data = data  # Store the input data for processing

        # Uncomment the following line for debugging during initialization
        # print('=== voice_processing_init ===')
        # self.voice_processing_init()

    #//==================================//
    def voice_alert(self, detector_instance):
        """
        Process the data from the detector instance and generate voice alerts.
        """

        print('=== voice_alert ===')
        # Extract the data list from the detector instance
        list = self.data
        print('list:=', list)  # Print the list for debugging

        # Define keyword lists for different commands
        keyword_list1 = ['bus0', 'bus1', 'bus2:', 'bus3']                            # Keywords for "Stop" command
        keyword_list2 = ['bicycle0', 'bicycle1', 'bicycle2', 'bicycle3']             # Keywords for "Alert" command
        keyword_list3 = ['motorcycle0', 'motorcycle1', 'motorcycle2', 'motorcycle3'] # Keywords for "Detected" command
        keyword_list4 = ['chair0', 'chair1', 'chair2', 'chair3']                     # Keywords for "Detected" command
        keyword_list5 = ['person0', 'person1', 'person2', 'person3']                 # Keywords for "Detected" command
        keyword_list6 = ['car', 'car1', 'car2', 'car3']                             # Keywords for "Detected" command
        keyword_list7 = ['tv0', 'tv1', 'tv2', 'tv3']                                 # Keywords for "Detected" command

        # Check if any keyword from the lists matches the detected words
        if any(word in list for word in keyword_list1):
            print('=== stop === ')
            speak("Stop!")
            return

        elif any(word in list for word in keyword_list2):
            print('=== alert === ')
            speak("Alert!")
            return

        elif any(word in list for word in keyword_list3):
            print('=== Detected === ')
            speak("Detected")
            return

        elif any(word in list for word in keyword_list4):
            print('=== Detected === ')
            speak("Detected")
            return

        elif any(word in list for word in keyword_list5):
            print('=== Detected === ')
            speak("Detected")
            return

        elif any(word in list for word in keyword_list6):
            print('=== Detected === ')
            speak("Detected")
            return

        elif any(word in list for word in keyword_list7):
            print('=== Detected === ')
            speak("Detected")
            return
