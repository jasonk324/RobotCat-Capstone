import pygame 
import time

path = "/home/pi/Desktop/RobotCat-Capstone/RaspberryPiCode/AudioFunctions/ai_voice.mp3"

pygame.mixer.init()
pygame.mixer.music.set_volume(1)
pygame.mixer.music.load(path)
pygame.mixer.music.play()
time.sleep(10)
# while pygame.mixer.music.get_busy()
# pygame.mixer.music.stop()
# pygame.quit()