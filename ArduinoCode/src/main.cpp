#include <Arduino.h>
#include <Servo.h>

Servo servo1;
int pos = 0;    
char piInput;

void servoSpin() {

  switch (piInput) {
    case '1':
      servo1.write(0);            
      break;
    case '2':
      servo1.write(90);            
      break;
    default:
      break;
    }
}

void setup() {
  Serial.begin(9600);
  servo1.attach(9); 
}

void loop() {
  if (Serial.available() > 0) {

    piInput = Serial.read();

    servoSpin();
  }
}
