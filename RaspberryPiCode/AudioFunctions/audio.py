from gtts import gTTS
import pygame 
import time

def create_ai_voice(text, language='en'):
    tts = gTTS(text=text, lang=language, slow=False)
    tts.save("ai_voice.mp3")

    # Play the generated audio file
    # os.system("start ai_voice.mp3")

    path = "/home/pi/Desktop/RobotCat-Capstone/RaspberryPiCode/AudioFunctions/ai_voice.mp3"

    pygame.mixer.init()
    pygame.mixer.music.set_volume(1)
    pygame.mixer.music.load(path)
    time.sleep(2)
    pygame.mixer.music.play()
    time.sleep(10)

# Example usage
text_to_speak = "I hate you, so so so so much, wink"
create_ai_voice(text_to_speak)
