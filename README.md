![a kinetic sculpture](https://github.com/54aaron/Module-3/blob/main/img/IMG_8831.jpg?raw=true)
# Dice.

"Dice" is a novel form of computer input.
Very simply, one rolls a "die" which provides input to a media arts application running on the web.
While Dice is designed to be somewhat generic - in the case of this specific project, the media arts program developed to demo Dice outputs a different drawing based on the side the die lands on. 

For example, if the die is rolled and lands on a one, the program will output a doodle of a cat. If the die is rolled again and lands on 4, the program will output a doodle of a straweberry.

# How It Works

On a hardware side, Dice is made possible through the use of an ESP32 microcontroller, a mpu-6050 gyroscope, and a 500mAh LiPo Battery enclosed in a box made of lasercut foamboard.
The X, Y, and Z axis readings from the gyroscope's accelerometer are calibrated to corresponed to each side of the die. As such, when the gyroscope is in a specific orientation, the accelerometer readings will signal that a certain side of the die is facing upwards. 

Below is a chart of how I determined which readings would correspond to which side: 

![a kinetic sculpture](https://github.com/54aaron/Module-3/blob/main/img/IMG_8831.jpg?raw=true)

On a software end, the media arts program of this project exists entirely online. 
This is accomplished through leveraging the ESP32 to host an online webserver and serving the media arts program through that same server.
As such, the ESP32 constantly sends accelerometer readings to this server in the form of events - which is how the media arts application is able to receive accelerometer readings.

Below are more specific instructions regarding the code featured in the repository, and also more specific installation instructions.

# Code
## ESP32
Dice facilitates several libraries to receive readings and serve the media arts application:
- The Wifi library to connect local WiFi sources
- ESPAsyncWebServer to initiate a web server on the ESP32
- And the Wire, Adafruit_MPU6050, and Adafruit_Sensor libraries to retreive accelerometer readings from the mpu6050 gyroscope

Much of the ESP32 code for this project was built upon the Adafruit_MPU6050 library's "basic_readings" example code.

### Connecting to Wi-Fi
As alluded to earlier, the program leverages the Arduino WiFi library in order to connect to nearby Wi-Fi networks. Given an SSID and a password, the program facilitates the libraries begin function to connect to the network in the setup() function.

### Flashing media arts program to ESP32
As the media arts program is served from the ESP32's web server, then it will also need to be on the device. This can be pretty easily accomplished through downloading the SPIFFS library and adding it to the Arudino IDE's Tool folder. Once accomplished, upon restarting the Arduino IDE the "Tools" tab should now have an option for "ESP sketch Data Upload." This feature essential flashes all files in the "Data" folder of your project. As such, I included all relevant HTML, CSS, JavaScript and media files to this folder then proceeded to flash my ESP32 with them.

### Web Server, events, and serivng files
As priorly stated, the ESP32 uses the ESPAsyncWebServer to initiate a web server. This is all pretty smoothly accomplished through configuring the server to serve an index.html file upon a GET request of /html, and using the SPIFFS library to access that index.html file. Afterwards, an event source is set up as to allow event handling.

### Accelerometer readings
Accelerometer readings are primarily accessed through the Adafruit_MPU6050 and Adafruit_Sensor libraries. A MPU object is created using the Adafruit_MPU6050 library. Afterwards, the Accelerometer, gyroscope and Filter bandwith are configured. Once completed, sensor events are instantiated in the loop function and then parsed for their readings. All parsed accelerometer readings are arrange into JSON format and then sent off as a "message" event.

## Media arts Program

In short, the media arts program used to display the die's functionality operates as a fairly simple javascript program. The program constantly listens for various events and then carries out some lines of code based on the type of event it receives.

In this case, the program is really only listening for "message"

# Hardware
  
### Flashing your ESP32 Device
After you're done with your code, you'll use the PlatformIO IDE's upload function to flash your device with the program via a USB-C cable between your computer and your ESP32's USB-C port. 

### Connecting Components 
All components were connected with the assistance of a breadboard and various jumper wires.
The stepper motor wires were connected to Ground, the 5v pin, as well as pins 25, 26, 27, and 33. The Servo motor wires were connected to Ground, the 5v pin, and pin 15. A potentiometer was also connected (ground, a 3.3v pin, and pin 12) but the potentiometer was never made functional.
  
![an ESP32 connected to two motors and potentiometer via a breadboard](https://github.com/54aaron/Module-3/blob/main/img/IMG_88071.jpg)

### Enclosure
The enclosure for this project was particularly important as it was intertwined with the overall visuals of the sculpture.

Similar to my last project, after the circuit had been built and all the components connected - it was then encased in a box of sorts made from cardboard and hot glued together. For this project, I went with a thinner cardboard that was easier to cut with a scissors. Moreover, the top of this enclosure was not hot glued together but was assembled using double sided tape. I wanted it to be removable in the case that I needed to troubleshoot the circuit (I did not need to).
The breadboard and motors had been secured to the bottom of this encasing using double sided tape. 

Moreover, large holes had been made on the top of this enclosure as to expose the motor shafts:
  
![An ESP32 circuit encased in a cardboard box](https://github.com/54aaron/Module-3/blob/main/img/IMG_8855.jpg)
  
After the overall circuit had been encased, I got to work on the planet and star sculptures.
This process was fairly straightforward and involved cutting out various cardboard shapes and hot gluing them together.

Once the sculptures had been assembled, they were attached to circular pieces of cardboard which would be attached to each motor. 

The planet sculpture was attached to the stepper motor via an incision made in the center of the circular pedestal.
The Star cluster sculpture had been attached to the servo motor via the use of a plastic propeller attachment and double-sided tape.

It might be worth considering the size of these sculptures as they would need to fit well with the motors.

I made the mistake of making the planet sculpture very large initially but it would always tip over its pedestal off the motor shaft.

![a very large cardboard planet sculpture](https://github.com/54aaron/Module-3/blob/main/img/IMG_8809.jpg)

And, as such, I needed to size down a bit:

![an tinier cardboard planet scultpure](https://github.com/54aaron/Module-3/blob/main/img/IMG_8810.jpg)

After everything had been assembled and hot glued together, I took the liberty of painting everything with acrylic paint.
Be sure to have enough paint and be aware that you may need multiple coats to fully cover the brown of the cardboard.

![an image of a eSP32 device running a program](https://github.com/54aaron/Module-3/blob/main/img/IMG_8828.jpg)
