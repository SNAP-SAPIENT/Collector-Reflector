#!/usr/bin/python
#import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_Stepper 
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

import picamera
import time
import atexit

camera = picamera.PiCamera()


camera.start_preview()
time.sleep(10)
camera.stop_preview()
