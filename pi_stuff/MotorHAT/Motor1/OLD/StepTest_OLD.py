#!/usr/bin/python
#import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_Stepper 
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

import sys
import picamera
import time
import atexit

# create a default object, no changes to I2C address or frequency
mh = Adafruit_MotorHAT()

#create camera object
#camera = picamera.PiCamera()

# recommended for auto-disabling motors on shutdown!
def turnOffMotors():
        mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(4).run(Adafruit_MotorHAT.RELEASE)

atexit.register(turnOffMotors)

myStepper = mh.getStepper(2048, 1)       # 200 steps/rev, motor port #1
myStepper.setSpeed(200)                  # 30 RPM

#reset motor to 0 degrees

#vidCount = 1
#picCount = 1


while (True):
        myStepper.step(512, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.DOUBLE)

"""
def Test1():
        while picCount <= 4: 
                #rotate platform by 45 degrees and take a picture (repeat 3 more times)
                print ("rotating to pic {}".format(picCount))
                myStepper.step(512, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.DOUBLE)
                print ("Taking picture {}".format(picCount))
                #take pic
                camera.capture('image{}.jpg'.format(picCount))
                time.sleep(.5)
                picCount += 1

while (True):
        #rotate platform by 360 degrees while taking video
        print ("Spinning 360 degrees")
        camera.start_recording('video{}.h264' .format(vidCount))
        myStepper.step(2048, Adafruit_MotorHAT.FORWARD,  Adafruit_MotorHAT.DOUBLE)
        camer.stop_recording()
        vidCount += 1
  """

sys.exit()
        
        
