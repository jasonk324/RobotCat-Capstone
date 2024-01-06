from gtts import gTTS
import os

def create_ai_voice(text, language='en'):
    tts = gTTS(text=text, lang=language, slow=False)
    tts.save("ai_voice.mp3")

    # Play the generated audio file
    os.system("start ai_voice.mp3")

# Example usage
text_to_speak = "I love you"
create_ai_voice(text_to_speak)
