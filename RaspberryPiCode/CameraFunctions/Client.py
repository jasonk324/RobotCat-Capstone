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
        # preview_config = picam2.create_preview_configuration(main={"size": (800, 600)})

        # picam2.configure(preview_config)

        # picam2.start_preview(Preview.QTGL)

        picam2.start()

        # imageData = bytearray()
        # camera.capture(imageData, format='jpeg')

        # imgName = "streaming/latestImage.jpg"
        # imgFire = storage.bucket().blob(blob.name)
        # imgFire.upload_from_strig(imageData, content_type="image/jpeg")

        print("File was updated\n")

        metadata = picam2.capture_file("test.jpg")
        
        imgFire = storage.bucket().blob("streaming/latestImage.jpg")
        imgFire.upload_from_filename("./test.jpg")

        time.sleep(1)
        print(metadata)
finally:
    picam2.close()


