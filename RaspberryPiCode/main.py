import serial 

ser = serial.Serial("/dev/ttyACM0", 9600)

while True:
    usrInput = input("Enter '1' or '2' to set a Servo ON: ")

    if usrInput == '1' or usrInput == '2':
        ser.write(usrInput.encode('utf-8'))

        response = ser.readline().decode('utf-8')

        print(response)
    else:
        print("Invalid input")