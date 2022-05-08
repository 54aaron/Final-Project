![a kinetic sculpture](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9455.jpg?raw=true)
# Dice.

"Dice" is a novel form of computer input.
Very simply, one rolls a "die" which provides input to a media arts application running on the web.
While Dice is designed to be somewhat generic - in the case of this specific project, the media arts program developed to demo Dice outputs a different drawing based on the side the die lands on. 

For example, if the die is rolled and lands on a one, the program will output a doodle of a cat. If the die is rolled again and lands on 4, the program will output a doodle of a straweberry.

# How It Works

On a hardware side, Dice is made possible through the use of an ESP32 microcontroller, a mpu-6050 gyroscope, and a 500mAh LiPo Battery enclosed in a box made of lasercut 3-ply chipboard.
The X, Y, and Z axis readings from the gyroscope's accelerometer are calibrated to corresponed to each side of the die. As such, when the gyroscope is in a specific orientation, the accelerometer readings will signal that a certain side of the die is facing upwards. 

Below is a chart of how I determined which readings would correspond to which side: 

![a kinetic sculpture](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9355.jpg?raw=true)

On a software end, the media arts program of this project exists entirely online. 
This is accomplished through leveraging the ESP32 to host an online webserver and serving the media arts program through that same server.
As such, the ESP32 constantly sends accelerometer readings to this server in the form of events - which is how the media arts application is able to receive accelerometer readings.

Below are more specific instructions regarding the code featured in the repository, and also more specific installation instructions.

# Code
## ESP32
Dice facilitates several libraries to receive readings and serve the media arts application:
- The Wifi library to connect to local WiFi sources
- ESPAsyncWebServer to initiate a web server on the ESP32
- And the Wire, Adafruit_MPU6050, and Adafruit_Sensor libraries to retreive accelerometer readings from the mpu6050 gyroscope

Much of the ESP32 code for this project was built upon the Adafruit_MPU6050 library's "basic_readings" example code.

### Connecting to Wi-Fi
As alluded to earlier, the program leverages the Arduino WiFi library in order to connect to nearby Wi-Fi networks. Given an SSID and a password, the program facilitates the libraries begin function to connect to the network in the setup() function.

### Flashing media arts program to ESP32
As the media arts program is served from the ESP32's web server, then it and its corresponding files will also need to be on the device. This can be pretty easily accomplished through downloading the SPIFFS library and adding it to the Arudino IDE's Tool folder. Once accomplished, upon restarting the Arduino IDE the "Tools" tab should now have an option for "ESP sketch Data Upload." This feature essential flashes all files in the "Data" folder of your project. As such, I included all relevant HTML, CSS, JavaScript and media files to this folder then proceeded to flash my ESP32 with them.

### Web Server, events, and serivng files
As priorly stated, the ESP32 uses the ESPAsyncWebServer to initiate a web server. This is all pretty smoothly accomplished through configuring the server to serve an index.html file upon a GET request of /html, and using the SPIFFS library to access that index.html file. Afterwards, an event source is set up as to allow event handling.

### Accelerometer readings
Accelerometer readings are primarily accessed through the Adafruit_MPU6050 and Adafruit_Sensor libraries. A MPU object is created using the Adafruit_MPU6050 library. Afterwards, the Accelerometer, gyroscope and Filter bandwith are configured. Once completed, sensor events are instantiated in the loop function and then parsed for their readings. All parsed accelerometer readings are arrange into JSON format and then sent off as a "message" event.

## Media arts Program

In short, the media arts program used to display the die's functionality operates as a fairly simple javascript program. The program constantly listens for various events and then carries out some lines of code based on the type of event it receives.

In this case, the program is really only listening for "message" events - which are the events that contain accelerometer readings.
Once those readings are received as a JSON message, they are then parsed by the program and their values corresponded to certain sides of the die.

Each side of the die (i.e. each combination of values) also corresponds to a .gif file of a doodle.
If it is determined that the die has landed on a certain side, then the doodle that corresponds to that side, as well as the number of the side, appears on the browser screen.

# Hardware
  
### Flashing your ESP32 Device
After you're done with your code, you'll use the Arduino IDE's upload function to flash your device with the program via a USB-C cable between your computer and your ESP32's USB-C port. 

### Connecting Components 
All components were connected with the assistance of various jumper wires.
The MPU6050 component was connected to a Ground pin, a 3v, and pins 21 and 22. 
  
![an ESP32 connected to an MPU6050 component via a breadboard](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9189.jpg)

### Enclosure
The enclosure for this project was particularly important as this was a project meant to be thrown.
As such, the enclosure would need to be:
- Sturdy enough as to not fall apart and also protect the components inside from impact.
- Respond well to being tossed

As such, I originally went with 4" x 4" x 4" 3-ply chipbaord.

![4" x 4" x 4" chipbaord die](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9358.jpg)

and, while it was pretty sturdy, it was not the best dice rolling experience in the world - so I eventualy switched to foam board:

![4" x 4" x 4" foamboard die](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9479.jpg)

But eventually landed on simply sizing the chipbaord down to 3 inches on each side:

![3" x 3" x 3" chipbaord die](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9458.jpg)

I initially only hot glued together 3 sides of the die's box as I wanted to assemble and secure the system before adding more sides, which would've made it more trickier to put together

![die prototype](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9349.jpg)

Once I had connected and secured the ESP32, battery, and gyroscope (with lots of electrical tape) - I hot glued together the other sides.

As to allow quick retrieval of components / access to troubleshooting, I did not glue one side. the tension of the foam board however, seemed to be more than enough to keep it in place while being tossed.
  
![die prototype](https://github.com/54aaron/Final-Project/blob/main/img/IMG_9459.jpg)
