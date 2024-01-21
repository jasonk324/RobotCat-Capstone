import io 
import socket 
import struct 
import time 
from picamera2 import Picamera2

client_socket = socket.socket()

client_socket.connect(('192.168.1.159', 8000))

connection = client_socket.makefile('wb')
try:
    camera = Picamera2()
    camera = 