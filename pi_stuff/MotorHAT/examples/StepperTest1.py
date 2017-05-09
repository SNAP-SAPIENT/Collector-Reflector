#!/usr/bin/python
#import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_Stepper 
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

import numpy
import time
import atexit

# create a default object, no changes to I2C address or frequency
mh = Adafruit_MotorHAT()

#create list to index steps


# recommended for auto-disabling motors on shutdown!
def turnOffMotors():
        mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)
        mh.getMotor(4).run(Adafruit_MotorHAT.RELEASE)

atexit.register(turnOffMotors)

myStepper = mh.getStepper(4, 1)       # 200 steps/rev, motor port #1
myStepper.setSpeed(30)                  # 30 RPM

i=1
while (True):
        print ("i took step")
        print (i)
        i += 1
        myStepper.oneStep(Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.DOUBLE)
        
        #print("Single coil steps")
        #myStepper.step(10, Adafruit_MotorHAT.FORWARD,  Adafruit_MotorHAT.DOUBLE)
        #myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.SINGLE)

        #print("Double coil steps")
        #myStepper.step(100, Adafruit_MotorHAT.FORWARD,  Adafruit_MotorHAT.DOUBLE)
        #myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.DOUBLE)

        #print("Interleaved coil steps")
        #myStepper.step(100, Adafruit_MotorHAT.FORWARD,  Adafruit_MotorHAT.INTERLEAVE)
        #myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.INTERLEAVE)

        #print("Microsteps")
        #myStepper.step(100, Adafruit_MotorHAT.FORWARD,  Adafruit_MotorHAT.MICROSTEP)
        #5myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.MICROSTEP)
