from voice_processing.voice_output import speak


#//==================================//
class voice_processing:
    def __init__(self, data):
        self.data = data

        # print('========= voice_processing_init ===========')
        # self.voice_processing_init()


    #//==================================//
    def voice_alert(detector_instance):


        print('========= voice_alert ===========')
        # print('data := ', detector_instance.data)
        # print(type(detector_instance.data))

        list = detector_instance.data
        print('list:=', list)
        # print(type(list))

        # words = 'a'
        # if words in list:
        #     print('=== AAA === ')
        #     winsound.Beep(frequency1, duration) 


        # if command:
        #     if 'go' in command:
        #         speak("Go straight")
        #         break
        #     elif 'left' in command:
        #         speak("Turn left")
        #         break
        #     elif 'right' in command:
        #         speak("Turn right")
        #         break
        #     elif 'stop' in command:
        #         speak("Stop")
        #         break
        #     elif 'alert' in command:
        #         speak("Alert! Obstacle detected")
        #         break
        #     else:
        #         speak("Command not recognized.")
        #         break


        keyword_list1 = ['bus4', 'ryt', 'car6:', 'yiu:']
        keyword_list2 = ['bicycle5', 'chair4542', 'chair', 'nab']
        keyword_list3 = ['motorcycle12', 'aaw', 'eec', 'nac']
        keyword_list4 = ['motorcycle4', 'dining table', 'eed', 'nad']
        keyword_list5 = ['COFFEE', 'sdser', 'tthtfd', 'nae']
        # print(type(keyword_list1))

        if any(word in list for word in keyword_list1):
            print('=== stop === ')
            # print('abd', 'ied', 'eed', 'nad')
            speak("Stop!")
            # winsound.Beep(frequency4, duration) 
            return
    
        elif any(word in list for word in keyword_list2):
            print('=== alert === ')
            # print('abe', 'iee', 'eee', 'nae')
            speak("Alert!")
            # speak("Alert! Obstacle detected")
            return
        
        elif any(word in list for word in keyword_list3):
            print('=== turn left === ')
            # print('MAD', 'PRIEST', 'eeb', 'nab')
            speak("Turn left")
            return
        
        elif any(word in list for word in keyword_list4):
            print('=== turn right === ')
            # print('abc', 'iec', 'eec', 'nac')
            speak("Turn right")
            return
           
        elif any(word in list for word in keyword_list5):
            print('=== go straight === ')
            # print('mad', 'priest', 'MAD', 'PRIEST')
            speak("Go straight")
            return





