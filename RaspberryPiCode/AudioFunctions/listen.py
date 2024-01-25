import speech_recognition as sr 
from datetime import date
from time import sleep 

r = sr.Recognizer()
mic = sr.Microphone()

while True:
    try:
        with mic as source:
            print("Listening...")
            audio = r.listen(source)
            print("Processing...")
            words = r.recognize_google(audio)
            print(words)
    except:
        print("I died")
    
    sleep(4)