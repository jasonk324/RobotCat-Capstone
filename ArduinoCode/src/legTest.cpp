#include <Arduino.h>
#include <Servo.h>

Servo calfServo;
Servo thighServo;
int pos = 0;    // variable to store the servo position
int thighStand=90; //starting position should be 90 deg, build leg accordingly
int calfStand=90;
int thighSit=70;
int calfSit=110;
//calfServo is between 0 and 90 deg, 0 for sit, 90 for stand
char piInput;

void servoSpin() {
  
  int calfCurrentPos=calfServo.read();
  int thighCurrentPos=thighServo.read();
  int thighPos;
  int calfPos;
  switch (piInput) {
    //For controls, always design sequences such that the cat calf and thighs move with same number of degrees
    case '1':
      //For Sitting
      if ((calfCurrentPos < calfSit) && (thighCurrentPos > thighSit))
      {
        for ( calfPos=calfCurrentPos,  thighPos=thighCurrentPos;thighPos>=thighSit; calfPos++,thighPos--){
          calfServo.write(calfPos);
          thighServo.write(thighPos);
          delay(20);
        }
      }
      else if ((calfCurrentPos > calfSit) && (thighCurrentPos < thighSit))
      {
        for ( calfPos=calfCurrentPos,  thighPos=thighCurrentPos;calfPos>=calfSit && thighPos<=thighSit; calfPos--,thighPos++){
          calfServo.write(calfPos);
          thighServo.write(thighPos);
          delay(20);
        }
      }
      else {
        Serial.println("Nothing Happened");
        break;
      }
      // calfServo.write(calfSit);
      // thighServo.write(thighSit);
      // delay(1000);
      Serial.println("Sitting");
      Serial.println(calfServo.read());
      Serial.println(thighServo.read());
      break;
    default:
    //For Sitting
      if ((calfCurrentPos > calfStand) && (thighCurrentPos < thighStand))
      {
        for ( calfPos=calfCurrentPos,  thighPos=thighCurrentPos;calfPos>=calfStand && thighPos<=thighStand; calfPos--,thighPos++){
          calfServo.write(calfPos);
          thighServo.write(thighPos);
          delay(20);
        }
      }
      else if ((calfCurrentPos < calfStand) && (thighCurrentPos > thighStand))
      {
        for ( calfPos=calfCurrentPos,  thighPos=thighCurrentPos;calfPos<=calfStand && thighPos>=thighStand; calfPos++,thighPos--){
          calfServo.write(calfPos);
          thighServo.write(thighPos);
          delay(20);
        }
      }
      else{
        Serial.println("NOthing Happned");
        break;
      }
      // calfServo.write(calfStand);
      // thighServo.write(thighStand);
      // delay(10);
      Serial.println("Standing");
      Serial.println(calfServo.read());
      Serial.println(thighServo.read());
      break;
  }
}

void setup() {
  Serial.begin(9600);
  calfServo.attach(9); 
  thighServo.attach(11);
}

void loop() {
  if (Serial.available() > 0) {
    // calfServo.write(calfStand);
    // thighServo.write(thighStand);
    piInput = Serial.read();
    Serial.println(piInput);
    servoSpin();
  }
}