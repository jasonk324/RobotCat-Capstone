#include <Arduino.h>
#include <Servo.h>

Servo servo1;
Servo servo2;
int pos = 0;    // variable to store the servo position
char piInput;

void servoSpin() {

  switch (piInput) {
    case '1':
      Serial.println("SERVO 1 IS ON");
      for (pos = 0; pos <= 180; pos += 1) { 
        servo1.write(pos);            
        delay(20);                    
      }
      for (pos = 180; pos >= 0; pos -= 1) { 
        servo1.write(pos);         
        delay(20);                     
      }
      break;
    case '2':
      Serial.println("SERVO 2 IS ON");
      for (pos = 0; pos <= 180; pos += 1) { 
        servo2.write(pos);            
        delay(20);                    
      }
      for (pos = 180; pos >= 0; pos -= 1) { 
        servo2.write(pos);         
        delay(20);                     
      }
      break;
    default:
      Serial.println("Nothing happened");
      break;
    }
}

void setup() {
  Serial.begin(9600);
  servo1.attach(9); 
  servo2.attach(11);
}

void loop() {
  if (Serial.available() > 0) {

    piInput = Serial.read();

    servoSpin();
  }
}
