import time
import firebase_admin
from firebase_admin import credentials, firestore, storage
from picamera2 import Picamera2, Preview

cred = credentials.Certificate("../capstonecat-firebase.json")
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'capstonecat.appspot.com'
})

picam2 = Picamera2()

try:
    while True:
        picam2.start()

        metadata = picam2.capture_file("latestImage.jpg")
        
        imgFire = storage.bucket().blob("streaming/latestImage.jpg")
        imgFire.upload_from_filename("./latestImage.jpg")

        time.sleep(1.6)
        print("File was updated\n")
finally:
    picam2.close()


