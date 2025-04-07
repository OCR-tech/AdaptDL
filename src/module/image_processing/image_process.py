# Import libraries
# //=======================================================//
import cv2
import numpy as np
# import matplotlib.pyplot as plt


#//==================================//
class image_processing:
    def __init__(self, image):
        self.image = image

        # print('========= image_processing_init ===========')
        # self.image_resize()


    #//==================================//
    def image_resize(self, scale):

        # print('========= image_resize ===========')
        # print('image :=', type(self.image))
        # print('shape := ', self.image.shape)
        # print('size := ', self.image.size)
        # print('dtype  := ', self.image.dtype)

        scale_percent = scale
        width = int(self.image.shape[1] * scale_percent / 100)
        height = int(self.image.shape[0] * scale_percent / 100)
        dim = (width, height)

        # image_resize = cv2.resize(self.image, (width, height))
        # image_resize = cv2.resize(self.image, (0, 0), fx=0.1, fy=0.1)
        # image_resize = cv2.resize(self.image, (0, 0), fx=0.5, fy=0.5)
        # image_resize = cv2.resize(self.image, (0, 0), fx=1, fy=1)
        image_resize = cv2.resize(self.image, dim, interpolation = cv2.INTER_AREA)

        # cv2.namedWindow("img_original")        
        # cv2.moveWindow("img_original", 250, 250)
        # cv2.imshow('img_original', self.image)

        # cv2.namedWindow("img_resize")        
        # cv2.moveWindow("img_resize", 250, 250)
        # cv2.imshow('img_resize', self.image)
        # cv2.waitKey()

        # print(type(image_resize))

        return image_resize


    # //=======================================//
    def image_rgb2bgr(self):

        print('========= image_color_conversion ===========')
        self.image = cv2.cvtColor(np.array(self.image),cv2.COLOR_RGB2BGR)
        cv2.imshow('img_bgr', self.image)


    # //=======================================//
    def image_grayscale(self):

        print('========= image_grayscale ===========')
        if len(self.image.shape) == 3 and self.image.shape[2] == 3:
            self.image = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
            cv2.imshow('img_gray', self.image)

    # //=======================================//
    def image_gray2rgb(self):
        print('========= image_gray2rgb ===========')
        self.image = cv2.cvtColor(self.image, cv2.COLOR_GRAY2RGB)
        cv2.imshow('img_rgb', self.image)

    # //=======================================//
    def image_threshold1(self):
        print('========= image_threshold1 ===========')
        self.image = cv2.threshold(self.image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        cv2.imshow('img_thres1', self.image)

    # //=======================================//
    def image_threshold2(self):
        print('========= image_threshold2 ===========')
        self.image = cv2.threshold(self.image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        cv2.imshow('img_thres2', self.image)

    # //=======================================//
    def image_bgr2gray(self):
        print('========= image_bgr2gray ===========')
        self.image = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        cv2.imshow('img_gray', self.image)

    # //=======================================//
    def image_blur(self):
        print('========= image_blur ===========')
        self.image = cv2.GaussianBlur(self.image, (3,3), 0)
        cv2.imshow('img_blur', self.image)









