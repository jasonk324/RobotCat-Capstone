import speech_recognition as sr 
from datetime import date
from time import sleep 

r = sr.Recognizer()
mic = sr.Microphone()

while True:
    try:
        with mic as source:
            print("Listening...")
            audio = r.listen(source, timeout=2)
            print("Processing...")
        words = r.reocgnize(audio)
        print(words)
        if ("stop" in words.lower()):
            print("Shutting Down")
            exit()
    except:
        print("I died")
    
    sleep(1.5)