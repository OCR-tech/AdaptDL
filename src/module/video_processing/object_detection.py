import os
import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt
import time
import datetime
import getpass

from main import classespath, configpath, modelpath             ###

from config.configs import FONT_FPS, FONT_COLOR_FPS, FONT_SIZE_FPS, FONT_THICKNESS_FPS
from config.configs import FONT_FPS, FONT_COLOR_FPS, FONT_SIZE_FPS, FONT_THICKNESS_FPS
from config.configs import FONT_TXT, FONT_COLOR_TXT, FONT_SIZE_TXT, FONT_THICKNESS_TXT
from config.configs import FONT_OBJ, FONT_COLOR_OBJ, FONT_SIZE_OBJ, FONT_THICKNESS_OBJ


# Detect Objects
# //=======================================//
sec = 1
np.random.seed(4)



#//==================================//
# class mynumber:
#     def __init__(self, value):
#         self.value = value

#     def print_value(self):
#         print(self.value)

# obj1 = mynumber(1)
# obj1.print_value()



#//==================================//
def capture_image(detector_instance):

    print('========= capture_image ===========')

    absolutepath = os.path.abspath(__file__)
    fileDirectory = os.path.dirname(absolutepath)
    parentDirectory = os.path.dirname(fileDirectory)
    image_path = os.path.join(parentDirectory, "image")
    # print(absolutepath)
    # print(fileDirectory)
    # print(parentDirectory)
    # print(image_path)

    image_file = image_path + '\\' + f'image_{detector_instance.frame_count:03d}.jpg'
    cv2.imwrite(image_file, detector_instance.image_original)

    # print('image_save := ', image_file)
    # detector_instance.frame_count += 1

    return image_file, image_path


#//==================================//
def capture_image_objbox(detector_instance):

    print('========= capture_image_objbox ===========')

    absolutepath = os.path.abspath(__file__)
    fileDirectory = os.path.dirname(absolutepath)
    parentDirectory = os.path.dirname(fileDirectory)
    image_path = os.path.join(parentDirectory, "image")

    image_file = image_path + '\\' + f'image_{detector_instance.frame_count:03d}_obj.jpg'
    cv2.imwrite(image_file, detector_instance.image_out)


# //=======================================//
def detect_objects(net, img):

    # print('========= detect_objects ===========')

    classlabelids, confidence, bbox = net.detect(img, confThreshold=0.5, nmsThreshold=0.4)
    bbox = list(bbox)
    # print('classlabelid := ', classlabelids)
    # print('confidence := ', confidence)
    # print('bbox := ', bbox)

    confidence = list(np.array(confidence).reshape(1, -1)[0])
    confidence = list(map(float, confidence))
    # print('confidence := ', confidence)

    bboxidx = cv2.dnn.NMSBoxes(bbox, confidence, score_threshold=0.5, nms_threshold=0.1)
    # print('bboxidx := ', bboxidx)
    # print('len(bbox) := ', len(bboxidx))

    return bbox, bboxidx, confidence, classlabelids


# //=======================================//
def display_objects(detector_instance, img, bbox1, bboxidx, confidence, classlabelids):

    # print('========= display_objects ===========')
    detector_instance.objid = []
    detector_instance.obj = []
    detector_instance.bbox = []
    detector_instance.confidence = []

    # print('bboxidx := ', bboxidx)
    # print('bboxidx := ', type(bboxidx))
    # print('bbox := ', bbox)

    if len(bboxidx) != 0:

        for i in range(0, len(bboxidx)):
            objid = [i + 1]

            # print('//--------------------------//')
            # print('i := ', i)
            # print('id := ', id)
            # print(len(bboxidx))
            # print('bboxidx[i] := ', bboxidx[i])

            bbox = bbox1[np.squeeze(bboxidx[i])]
            # print('bbox := ', bbox)
            # print('bbox := ', type(bbox))

            classconfidence = np.round(confidence[np.squeeze(bboxidx[i])],2)
            # print('classconfidence := ', classconfidence)

            classlabelid = np.squeeze(classlabelids[np.squeeze(bboxidx[i])])
            # print(i)
            # print('classlabelid := ', classlabelid)

            classlabel = [detector_instance.classeslist[classlabelid]]
            # print('classeslist := ', detector_instance.classeslist)
            # print('classlabel := ', classlabel)
            # print(type(classlabel))

            # detector_instance.obj = detector_instance.obj + ', ' + classlabel
            # self.obj = ' '.join(self.obj['label'])
            # print('list := ', detector_instance.obj)

            x,y,w,h = bbox
            # print('x := ', x)
            # print('y := ', y)
            # print('w := ', w)
            # print('h := ', h)

            classcolor = [int(c) for c in detector_instance.colorlist[classlabelid]]
            # print('classcolor := ', classcolor)

            label = "{}: {}: {:.2f}".format(objid, classlabel, classconfidence)
            # label = "{}: {:.2f}: {}".format(classlabel, classconfidence, i)
            # print('Text := ', Text)


            # bbox = bbox1[np.squeeze(bboxidx[i])].tolist()
            bbox = [[x,y,w,h]]
            classconfidence = [classconfidence]

            #//=====================================
            detector_instance.objid = detector_instance.objid + objid
            detector_instance.bbox = detector_instance.bbox + bbox
            detector_instance.confidence = detector_instance.confidence + classconfidence
            detector_instance.obj = detector_instance.obj + classlabel



            # print('========= display_text ===========')
            # cv2.rectangle(detector_instance.image_resize, (x,y), (x+w, y+h), color=classcolor, thickness=THICKNESS1)
            # cv2.rectangle(self.image, (x,y), (x+w, y+h), color=(255,255,255), thickness=3)
            # cv2.imshow("Result2", self.image)

            # cv2.putText(img, 'ABC', (150, 40), FONT, FONT_SCALE2, (255,255,255), THICKNESS1)
            # cv2.imshow("Result3", self.image)

            # cv2.putText(self.image, classlabel, (x, y+20), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 3)
            # cv2.imshow("Result3", self.image)

            # cv2.putText(self.image, str(round(classconfidence*100, 2)), (x, y+40), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255,255,255), 1)
            # cv2.imshow("Result4", self.image)

            cv2.putText(img, "Press 'm' for menu", (10, 55), FONT_TXT, FONT_SIZE_TXT, FONT_COLOR_TXT, FONT_THICKNESS_TXT)
            cv2.putText(img, "Press 'Esc' to exit", (10, 75), FONT_TXT, FONT_SIZE_TXT, FONT_COLOR_TXT, FONT_THICKNESS_TXT)

            cv2.putText(img, label, (x, y-10), FONT_OBJ, FONT_SIZE_OBJ, classcolor, FONT_THICKNESS_OBJ)
            # # cv2.imshow("Result3", self.image)

            linewidth = min(int(w*0.3), int(h*0.3))

            cv2.line(img, (x, y), (x+linewidth, y), classcolor, thickness=FONT_THICKNESS_OBJ)
            cv2.line(img, (x, y), (x,y+linewidth), classcolor, thickness=FONT_THICKNESS_OBJ)
            cv2.line(img, (x+w, y), (x+w-linewidth, y), classcolor, thickness=FONT_THICKNESS_OBJ)
            cv2.line(img, (x+w, y), (x+w,y+linewidth), classcolor, thickness=FONT_THICKNESS_OBJ)

            cv2.line(img, (x, y+h), (x+linewidth, y+h), classcolor, thickness=FONT_THICKNESS_OBJ)
            cv2.line(img, (x, y+h), (x,y+h-linewidth), classcolor, thickness=FONT_THICKNESS_OBJ)
            cv2.line(img, (x+w, y+h), (x+w-linewidth, y+h), classcolor, thickness=FONT_THICKNESS_OBJ)
            cv2.line(img, (x+w, y+h), (x+w,y+h-linewidth), classcolor, thickness=FONT_THICKNESS_OBJ)


            # if  detector_instance.imagepath == "-":
            #     cv2.putText(img, 'FPS: '+str(int(detector_instance.fps)), (20, 40), FONT, FONT_SCALE2, (255,255,255), THICKNESS1)
            # # cv2.imshow("Result5", self.image)

            # cv2.putText(img, f"FPS: {int(detector_instance.fps)}", (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            # cv2.putText(img, f"FPS: {detector_instance.fps:.2f}", (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            # cv2.putText(img, 'FPS: '+str(int(detector_instance.fps)), (20, 40), FONT, FONT_SCALE2, (255,255,255), THICKNESS1)

            # self.image1 = img.copy()
            # cv2.waitKey(1)
            # time.sleep(5)


    # print('//============================//')
    # print('objid :=', detector_instance.objid)            ###
    # print('obj :=', detector_instance.obj)
    # print('bbox :=', detector_instance.bbox)
    # print('confidence :=', detector_instance.confidence)

    # print(detector_instance.bbox[0])
    # print(detector_instance.bbox[1])


    # #//=====================================
    # keys = ["objid", "obj", "objbox", "objconf"]
    # values = [detector_instance.objid, detector_instance.obj, detector_instance.bbox, detector_instance.confidence]
    # dict_obj = dict(zip(keys, values))
    # print(dict_obj)


    # image = img
    return img


# //===========================================//
def capture_frame(detector_instance,video_source=0, output_filename="frame.jpg"):

    # """Capture a single frame from the video source and save it as an image."""
    print("//=== Capturing frame ===//")
    cv2.imshow(detector_instance.window, detector_instance.image_out)
    cv2.imwrite(output_filename, detector_instance.image_out)

    # # Open the video source (default is webcam)
    # cap = cv2.VideoCapture(video_source)

    # if not cap.isOpened():
    #     print("Error: Could not open video source.")
    #     return

    # # Capture a single frame
    # ret, frame = cap.read()
    # if ret:
    #     # Save the frame as an image
    #     cv2.imwrite(output_filename, frame)
    #     # cv2.imwrite("captured_frame.jpg", frame_with_detections)
    #     print(f"Frame captured and saved as {output_filename}")
    # else:
    #     print("Error: Could not capture frame.")

    # # Release the video source
    # cap.release()


#//==================================//
def command_assistant(detector_instance):
    from voice_processing.voice_input import listen_for_commands
    from voice_processing.voice_output import speak, set_volumn, on_volumn, off_volumn

    print('========= command_assistant ===========')
    # detector_instance.timer_alert.stop()
    detector_instance.timer_assistant.stop()


    # Start listening for voice commands
    while True:

        command = ""
        command = listen_for_commands()

        # command = "exit"
        # command = "start"
        # command = "help"
        # command = "capture"

        # print(f"Voice Command: {command}")
        # speak(command)

        # Process the command
        if command:

            if command == "exit":
                speak(command)
                on_volumn()
                print("Exiting the system.")
                speak("Exiting the system.")
                os._exit(1)
                # detector_instance.timer_assistant.stop()
                # detector_instance.timer_alert.stop()
                # cv2.destroyAllWindows()
                # return
            elif command == "stop":
                speak(command)
                print("Stop the system.")
                speak("Stop the system.")
                return
            elif command == "help":
                speak(command)
                print("Available commands: capture, pause, resume, stop, record, play, save, alert, exit")
                speak("Available commands: capture, pause, resume, stop, record, play, save, alert, exit")
                return
            elif command == "capture":
                speak(command)
                print("Capturing frame...")
                speak("Capturing frame...")
                capture_frame(detector_instance)
                return
            elif command == "pause":
                speak(command)
                print("Pausing frame...")
                speak("Pausing frame...")
                # pause_frame(detector_instance)
                return
            elif command == "resume":
                speak(command)
                print("Resuming the system...")
                speak("Resuming the system...")
                # resume_frame(detector_instance)
                return
            elif command == "record":
                speak(command)
                print("Recording frame...")
                speak("Recording frame...")
                # record_frame(detector_instance)
                return
            elif command == "play":
                speak(command)
                print("Playing frame...")
                speak("Playing frame...")
                return
            elif command == "save":
                speak(command)
                print("Save frame...")
                speak("Save frame...")
                cv2.imwrite("snapshot.jpg", detector_instance.image_out)
                return
            elif command == "menu":
                speak(command)
                print("Displaying menu")
                speak("Displaying menu")
                return
            elif command == "on":
                speak(command)
                on_volumn()
                print("Alert On!")
                speak("Alert On!")
                return
            elif command == "off":
                speak(command)
                print("Alert Off!")
                speak("Alert Off!")
                off_volumn()
                return
            else:
                speak(command)
                print('--- other command ---')
                # time.sleep(0.1)
                # detector_instance.timer_alert.start()
                return

        else:
            print('command = none')


        command = ""


#//==================================//
def command_alert(detector_instance):

    from voice_processing.voice_process import voice_processing


    print('========= command_alert ===========')
    detector_instance.timer_assistant.stop()
    detector_instance.timer_alert.stop()

    # sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
    # detector_instance.image_file, detector_instance.image_path = capture_image(detector_instance)
    # detector_instance.frame_count += 1
    # detector_instance.data = detector_instance.obj

    voice_processor = voice_processing(detector_instance.obj)
    detector_instance.voice = voice_processor.voice_alert()

    detector_instance.timer_assistant.start()
    detector_instance.timer_alert.start()

    return


# //===========================================//
def exit_program(detector_instance):

    print("Exiting the system.")
    detector_instance.timer_assistant.stop()
    detector_instance.timer_alert.stop()
    detector_instance.source.release()
    cv2.destroyWindow(detector_instance.window)
    cv2.destroyAllWindows()
    os._exit(1)


#//==================================//
class detector:
    def __init__(self, imagepath, videopath, configpath, modelpath, classespath):
        self.imagepath = imagepath
        self.videopath = videopath
        self.configpath = configpath
        self.modelpath = modelpath
        self.classespath = classespath

        print('========= detector_init ===========')
        self.setupClasses()
        self.readClasses()
        # self.get_gps_location()
        # self.onVideo()


    #//==================================//
    def setupClasses(self):

        print('========= setupClasses ===========')
        self.net = cv2.dnn_DetectionModel(modelpath, configpath)
        self.net.setInputSize(320,326)
        self.net.setInputScale(1.0/127.5)
        self.net.setInputMean((127.5, 127.5, 127.5))
        self.net.setInputSwapRB(True)
        # print('net := ', self.net)


    #//==================================//
    def readClasses(self):

        print('========= readClasses ===========')
        with open(classespath, 'r') as f:
            self.classeslist = f.read().splitlines()

        self.classeslist.insert(0, '__Background__')
        self.colorlist = np.random.uniform(low=0, high=255, size=(len(self.classeslist), 3))
        # print(self.classeslist)



    #//==================================//
    def onVideo(self):
        from config.configs import s

        sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
        from image_processing.image_process import image_processing
        from timer_processing.timer import Timer

        print('========= onVideo ===========')

        self.timer_assistant = Timer(sec, command_assistant, self)
        self.timer_alert = Timer(sec, command_alert, self)
        #//================================//


        # //==================================//
        # s = 0
        # s = self.videopath
        # //==================================//

        if len(sys.argv) > 1:
            s = sys.argv[1]
            print(s)

        # for i in range(10):
        #     cap = cv2.VideoCapture(i)
        #     if cap.isOpened():
        #         print(f"Camera index {i} is available")


        self.source = cv2.VideoCapture(s)

        self.window = 'camera'
        cv2.namedWindow(self.window, cv2.WINDOW_NORMAL)

        starttime = 0
        self.id1 = 0
        self.frame_count = 1
        self.obj = str('')
        self.text = str('')



        while cv2.waitKey(1) != (27 or ord("p")):
            success, frame = self.source.read()

            if not success:
                print("Error: Failed to open video")
                break

            currenttime = time.time()
            self.fps = 1/(currenttime - starttime)
            starttime = currenttime
            # print('fps := ', self.fps)


            self.image_original = frame.copy()
            width = self.image_original.shape[1]
            height = self.image_original.shape[0]

            image_processor = image_processing(self.image_original)
            self.image_resize = image_processor.image_resize(100)

            # //================================//
            # // fps,cam = 32 // fps,vid = 50 //
            # //================================//


            # //================================//
            # // fps,cam = 12 // fps,vid = 16 //
            # # //==============================//
            bbox, bboxidx, confidence, classlabelids = detect_objects(self.net, self.image_resize)
            self.image_out = display_objects(self, self.image_resize, bbox, bboxidx, confidence, classlabelids)



            # self.image_out = self.image_resize
            # self.image_out = cv2.cvtColor(self.image_out, cv2.COLOR_BGR2RGB)


            #//================================//
            cv2.putText(self.image_out, f"FPS: {int(self.fps)}", (15, 30), FONT_FPS, FONT_SIZE_FPS, FONT_COLOR_FPS, FONT_THICKNESS_FPS)



            #//================================//
            # Set screen resolution
            # screen_width = 1920
            # screen_height = 1080
            # winx = int(screen_width/2 - int(width/2))
            # winy = int(screen_height/2 - int(height/2))
            # cv2.moveWindow(win, winx - 50, winy)
            # cv2.resizeWindow(window, width, height)
            cv2.imshow(self.window, self.image_out)


            #//================================//
            # if cv2.waitKey(1) & 0xFF == 27:
            #     break

            key = cv2.waitKey(1)
            if key == ord("Q") or key == ord("q") or key == 27:
                # break
                exit_program(self)
            elif key == ord("C") or key == ord("c"):
                print('//=== c ===')
                # window = 1
            elif key == ord("B") or key == ord("b"):
                print('//=== b ===')
                # break
            elif key == ord("F") or key == ord("f"):
                print('//=== f ===')
                # window = 3
            elif key == ord("P") or key == ord("p"):
                print('//=== p ===')
                break

        self.timer_assistant.stop()
        self.timer_alert.stop()
        self.source.release()



        # # Release the capture object and close all OpenCV windows
        # print('//=== release ===//')
        # self.timer_assistant.stop()
        # # self.timer_alert.stop()
        # self.source.release()
        # cv2.destroyWindow(self.window)
        # cv2.destroyAllWindows()
        # os._exit(1)






    #//==================================//
    def onImage(self):
        sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
        from image_processing.image_process import image_processing
        # from timer_processing.timer import timer_record

        print('========= onImage ===========')

        self.window = 'image'
        cv2.namedWindow(self.window, cv2.WINDOW_NORMAL)

        self.id1 = 0
        self.obj = str('')
        self.text = str('')

        self.frame_count = 1
        print('imagepath := ', self.imagepath)

        # self.image_original = cv2.imread('D:/Documents/workspace/test_data/image/pic1a.jpg')
        self.image_original = cv2.imread(self.imagepath)
        width = self.image_original.shape[1]
        height = self.image_original.shape[0]


        image_processor = image_processing(self.image_original)
        self.image_resize = image_processor.image_resize(100)


        # objects = detect_objects(net, self.image)
        # self.image = display_objects(self, self.image, objects)

        bbox, bboxidx, confidence, classlabelids = detect_objects(self.net, self.image_resize)
        self.image_out1 = display_objects(self, self.image_resize, bbox, bboxidx, confidence, classlabelids)

        # self.image_out2 = text_detection(self)
        self.image_out2 = self.image_out1


        alpha = 0.5
        beta = (1.0 - alpha)
        self.image_out  = cv2.addWeighted(self.image_out1, alpha,  self.image_out2, beta, 0.5)
        self.image_out  = np.uint8(alpha*(self.image_out1)+beta*(self.image_out2))



        # Set screen resolution
        screen_width = 1920
        screen_height = 1080
        winx = int(screen_width/2 - int(width/2))
        winy = int(screen_height/2 - int(height/2))


        cv2.resizeWindow(self.window, width, height)
        cv2.moveWindow(self.window, winx - 50, winy)
        cv2.imshow(self.window,self.image_out)
        cv2.waitKey()
