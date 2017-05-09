#!/usr/bin/python
#import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_Stepper 
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

import sys
import picamera
from time import sleep
import atexit

camera = picamera.PiCamera()
camera.resolution = '720p'

camera.start_recording('vid1.h264')
print ("recording")
sleep(5)
camera.stop_recording()
print("done")
sys.exit()
