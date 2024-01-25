from gtts import gTTS
import pygame 
import time
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timezone
import speech_recognition as sr 

def listenSound():
    try:
        with mic as source:
            print("Listening...")
            audio = r.listen(source)
            print("Processing...")
            words = r.recognize_google(audio)
            print(words)
    except:
        print("I died")

def playTextSound(text, language='en'):
    tts = gTTS(text=text, lang=language, slow=False)
    tts.save("textToSpeach.mp3")

    path = "/home/pi/Desktop/RobotCat-Capstone/RaspberryPiCode/AudioFunctions/textToSpeach.mp3"

    pygame.mixer.init()
    pygame.mixer.music.set_volume(1)
    pygame.mixer.music.load(path)
    time.sleep(10)
    pygame.mixer.music.play()

def on_snapshot(col_snapshot, changes, read_time):
    print("Captured snapshot")
    for change in changes:
        new_item = change.document.to_dict()
        created_at = new_item.get("createdAt")
        if created_at >= start_time:
            if new_item['location'] == 'React':
                print("new message")
                playTextSound("Hello " + new_item['message'])
            elif new_item['message'] == '111':
                listenSound()

r = sr.Recognizer()
mic = sr.Microphone()

cred = credentials.Certificate("../capstonecat-firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
actions_ref = db.collection('Messages')

start_time = datetime.now(timezone.utc)

actions_ref.on_snapshot(on_snapshot)

while True:
    pass
