#include <Arduino.h>

#define trigPin 10
#define echoPin 13

float duration, distance;
float speedOfSound=0.0343;//In centimeters per microsecond
int maxDistance=30, minDistance=2;

void setup () {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  //Create a 10 microsecond pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  //Measure Response from Echo Pin
  duration=pulseIn(echoPin, HIGH); //Result is in microseconds, and measures time for signal to hit object AND bounce back

  //Calculate Distance between object and sensor
  distance= (duration/2)*speedOfSound;

  if (distance >= maxDistance || distance <= minDistance){
    Serial.print("Path is Clear, distance nearest obstruction: ");
    Serial.print(distance);
    Serial.println(" cm.");
  }
  else {
    Serial.print("Path is Blocked, distance from nearest obstruction = ");
    Serial.print(distance);
    Serial.println(" cm");
  }
  delay(1000);

}