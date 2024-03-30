#include <LCD_I2C.h>
#include <Multichannel_Gas_GMXXX.h>

LCD_I2C lcd(0x27, 16, 2); // Default address of most PCF8574 modules, change according

GAS_GMXXX<TwoWire> gas;

void setup() {
    Serial.begin(9600);
    lcd.begin();
    lcd.backlight();
    gas.begin(Wire, 0x08); // Initialize the gas sensor
    //delay(10000);
    lcd.clear();
    smell();
    ///delay(10000); // Wait before starting the next loop iteration
    ///lcd.clear();
}

void loop() {
  if (Serial.available() > 0) {
    char userInput = Serial.read();
    switch (userInput) {
      case 'r':
        lcd.clear();
        break;
      case 's':
        smell();
        break;
      default:
        break;
    }
  }
}
void smell() {

    uint32_t sum_NO2 = 0;
    uint32_t sum_C2H5CH = 0;
    uint32_t sum_VOC = 0;
    uint32_t sum_CO = 0;
    int numReadings = 10; // Number of readings to take for averaging
    unsigned long interval = 1000; // Interval between readings (in milliseconds)

    for (int i = 0; i < numReadings; i++) {
        sum_NO2 += gas.measure_NO2();
        sum_C2H5CH += gas.measure_C2H5OH();
        sum_VOC += gas.measure_VOC();
        sum_CO += gas.measure_CO();
        delay(interval); // Wait before taking the next reading
        lcd.setCursor(0, 0); // Set cursor to the first row
        lcd.print("Reading...");
    }

    // Calculate the average
    sum_NO2 /= numReadings;
    sum_C2H5CH /= numReadings;
    sum_VOC /= numReadings;
    sum_CO /= numReadings;

    Serial.print("Average NO2: ");
    Serial.print(sum_NO2);
    Serial.println(" ppm");
    Serial.print("Average C2H5CH: ");
    Serial.print(sum_C2H5CH);
    Serial.println(" ppm");
    Serial.print("Average VOC: ");
    Serial.print(sum_VOC);
    Serial.println(" ppm");
    Serial.print("Average CO: ");
    Serial.print(sum_CO);
    Serial.println(" ppm");

    delay(3000);
    lcd.clear();

    lcd.setCursor(0, 0); // Set cursor to the first row
    lcd.print("NO2: ");
    lcd.print(sum_NO2);
    lcd.print(" ppm");

    lcd.setCursor(0, 1); // Set cursor to the second row
    lcd.print("C2H5CH: ");
    lcd.print(sum_C2H5CH);
    lcd.print(" ppm");

    delay(3000);
    lcd.clear();

    lcd.setCursor(0, 0); // Set cursor to the first row
    lcd.print("VOC: ");
    lcd.print(sum_VOC);
    lcd.print(" ppm");

    lcd.setCursor(0, 1); // Set cursor to the second row
    lcd.print("CO: ");
    lcd.print(sum_CO);
    lcd.print(" ppm");

    delay(3000);
    lcd.clear();

    lcd.setCursor(0, 0); // Set cursor to the first row
    lcd.print("Smell: ");

    lcd.setCursor(0, 1);

    // Calculate differences between measured values and threshold values for each scent
    int perfume = abs(sum_C2H5CH - 1000) + abs(sum_VOC - 950) + abs(sum_CO - 950) + abs(sum_NO2 - 800);
    int air = abs(sum_C2H5CH - 660) + abs(sum_VOC - 660) + abs(sum_CO - 290) + abs(sum_NO2 - 270);
    int coffee = abs(sum_C2H5CH - 700) + abs(sum_VOC - 700) + abs(sum_CO - 280) + abs(sum_NO2 - 300);
    int beer = abs(sum_C2H5CH - 950) + abs(sum_VOC - 950) + abs(sum_CO - 900) + abs(sum_NO2 - 500);
    int whiskey = abs(sum_C2H5CH - 100) + abs(sum_VOC - 300) + abs(sum_CO - 200) + abs(sum_NO2 - 100);
    int wine = abs(sum_C2H5CH - 800) + abs(sum_VOC - 200) + abs(sum_CO - 600) + abs(sum_NO2 - 500);

    perfume = abs(perfume);
    air = abs(air);
    coffee = abs(coffee);
    beer = abs(beer);
    whiskey = abs(whiskey);
    wine = abs(wine);

    // Display scent based on the smallest total difference
    if (perfume < air && perfume < coffee && perfume < beer && perfume < whiskey && perfume < wine) {
        lcd.print("PERFUME!");
    } else if (air < coffee && air < beer && air < whiskey && air < wine && air < perfume) {
        lcd.print("AIR!");
    } else if (coffee < perfume && coffee < air && coffee < beer && coffee < whiskey && coffee < wine) {
        lcd.print("COFFEE!");
    } else if (beer < perfume && beer < air && beer < coffee && beer < whiskey && beer < wine) {
        lcd.print("BEER!");
    } else if (whiskey < perfume && whiskey < air && whiskey < coffee && whiskey < beer & whiskey < wine) {
        lcd.print("WHISKEY!");
    } else {
        lcd.print("NOT DETECTED!");
    }
}
