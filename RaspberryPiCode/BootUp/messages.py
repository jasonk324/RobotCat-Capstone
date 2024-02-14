from gtts import gTTS
import pygame 
import time
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore import SERVER_TIMESTAMP
from datetime import datetime, timezone
import speech_recognition as sr 

def submitMessage(text):
    messageDocRef = messageRef.document()
    print("Hi I made a document")
    messageData = {
        'message': text,
        'location': "Pi",
        'createdAt': SERVER_TIMESTAMP
    }
    print("Hi I made a dictionary")
    print(messageData)
    messageDocRef.set(messageData)
    print("Wow I wonder if I made it here")


def listenSound():
    try:
        with mic as source:
            print("Listening...")
            audio = r.listen(source)
            print("Processing...")
            words = r.recognize_google(audio)
            print(words)
            submitMessage(str(words))
            time.sleep(1)
            submitMessage("complete1")
    except:
        print("I died")

def playTextSound(text, language='en'):
    tts = gTTS(text=text, lang=language, slow=False)
    tts.save("textToSpeach.mp3")

    path = "/home/pi/Desktop/RobotCat-Capstone/RaspberryPiCode/BootUp/textToSpeach.mp3"

    pygame.mixer.init()
    pygame.mixer.music.set_volume(1)
    pygame.mixer.music.load(path)
    pygame.mixer.music.play()

def on_snapshot(col_snapshot, changes, read_time):
    print("Captured snapshot")
    for change in changes:
        docId = change.document.id
        docNew = change.document.to_dict()
        print(docNew)
        createdAt = docNew.get("createdAt")
        fromLocation = docNew.get('location') 
        message = docNew.get('message')

        if createdAt >= startTime and docId not in docSeen and fromLocation == 'React':
            if message != 'listen1':
                print("new message")
                print(message)
                playTextSound("Hello " + message)
            else:
                listenSound()

        docSeen.append(docId)
        print("Updated docs seen")
        print(docSeen)

docSeen = list()

r = sr.Recognizer()
mic = sr.Microphone()

startTime = datetime.now(timezone.utc)

cred = credentials.Certificate("../capstonecat-firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
messageRef = db.collection('Messages')
messageRef.on_snapshot(on_snapshot)

while True:
    pass
