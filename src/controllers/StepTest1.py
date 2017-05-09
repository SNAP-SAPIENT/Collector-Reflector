#!/usr/bin/python
#import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_Stepper 
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

import picamera
import time
import atexit
import os
import sys

# create a default object, no changes to I2C address or frequency

mh = Adafruit_MotorHAT()

#create camera object
camera = picamera.PiCamera()

# recommended for auto-disabling motors on shutdown!
def turnOffMotors():
        mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(4).run(Adafruit_MotorHAT.RELEASE)

atexit.register(turnOffMotors)

myStepper = mh.getStepper(2048, 1)       # 200 steps/rev, motor port #1
myStepper.setSpeed(60)                  # 30 RPM

#reset motor to 0 degrees


def read_in():
        lines = sys.stdin.readlines()
        for item in lines:
                return item

def makeFolder():
        folder = read_in().rstrip()
        folder = os.getcwd() + '/captures/' + folder + '/'
        if not os.path.exists(folder):
                os.makedirs(folder)
        return folder


def pics(folder):
        picCount = 1
        while picCount <= 4:
                myStepper.step(512, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.DOUBLE)
                camera.capture(folder + 'image{}.jpg' .format(picCount))
                picCount += 1
                
        
"""
def pics(folder):
        #Take Pictures        
        picCount = 1
        while picCount <= 4: 
                #rotate platform by 45 degrees and take a picture (repeat 3 more times)
                myStepper.step(512, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.DOUBLE)
                #take pic
                camera.capture(folder + 'image{}.jpg'.format(picCount))
                time.sleep(.5)
                picCount += 1

"""

def video(folder):
        camera.resolution = '720p'
        #rotate platform by 360 degrees while taking video
        camera.start_recording(folder + 'video.h264')
        myStepper.step(2048, Adafruit_MotorHAT.FORWARD,  Adafruit_MotorHAT.DOUBLE)
        camera.stop_recording()

def main():
        directory = makeFolder()
        pics(directory)
        video(directory)
        print directory

        
main()        
