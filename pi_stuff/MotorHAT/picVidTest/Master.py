#!/usr/bin/python
#import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_Stepper 
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

import sys
from time import sleep

from StepTest1 import *
from StepTest2 import *
print ("TESTINGTESTING123")

st1 = StepTest1
st2 = StepTest2
print ("beforeloop")

i = 1
while (i <= 2):
    print ("inloop")
    st1.Test1()
    print ("file 1 complete")
    sleep(2)
    st2.Test2()
    print ("file 2 complete")
    i +=1

sys.exit()
