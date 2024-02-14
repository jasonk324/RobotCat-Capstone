from gtts import gTTS
import pygame 
import firebase_admin
from firebase_admin import credentials, firestore

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
        if change.type.name == "MODIFIED":
            changed_doc = change.document
            output = changed_doc.to_dict().get("Output")
            playTextSound("Hello " + output)

cred = credentials.Certificate("../capstonecat-firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
messageRef = db.collection('Conversations')
messageRef.on_snapshot(on_snapshot)

while True:
    pass
