#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


WiFiClient client;
// WiFi credentials
const char* ssid = "Airtel_ompr_8321";
const char* password = "op987654321";

// Backend URLs
const String serverUrl = "http://192.168.1.6:5000/api/dustbin/update";
const String collectedUrl = "http://192.168.1.6:5000/api/dustbin/collected";

int gasLevel = 200;   
// Ultrasonic pins
const int trigPin = D1;
const int echoPin = D2;

// Buttons
const int toggleBtn = D5;
const int collectBtn = D6;

// LEDs
const int greenLED = D7;    // Measuring ON
const int redLED = D8;      // Measuring OFF
const int whiteLED = D4;    // Garbage collected
const int yellowLED = D3;   // Low level
const int redFullLED = D0;  // Full bin

// Variables
bool measureEnabled = true;
unsigned long lastSent = 0;
const unsigned long interval = 10000; // 10 sec

int dustbinHeight = 19;
int sensorDistance = 43;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  pinMode(toggleBtn, INPUT_PULLUP);
  pinMode(collectBtn, INPUT_PULLUP);

  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  pinMode(whiteLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(redFullLED, OUTPUT);

  connectWiFi();
}

void loop() {
  handleButtons();

  // LED indication based on measurement state
  digitalWrite(greenLED, measureEnabled ? HIGH : LOW);
  digitalWrite(redLED, measureEnabled ? LOW : HIGH);

  // Measure and send data
  if (measureEnabled && millis() - lastSent >= interval) {
    lastSent = millis();
    int distance = readDistance();
    int garbageHeight = sensorDistance - distance;
    int per = (garbageHeight * 100)/ dustbinHeight;

    Serial.print("height of garbage is: ");
    Serial.print(garbageHeight);
    Serial.println("cm");
    Serial.print("distance form sensor is: ");
    Serial.print(distance);
    Serial.println("cm");
    handleLEDForLevel(distance);
    sendDistance(per);
  }
}

// -------- WiFi Connection --------
void connectWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
  Serial.println(WiFi.localIP());
}

// -------- Handle Buttons --------
void handleButtons() {
  static bool lastToggleState = HIGH;
  static bool lastCollectState = HIGH;

  bool toggleState = digitalRead(toggleBtn);
  bool collectState = digitalRead(collectBtn);

  // Toggle measurement
  if (toggleState == LOW && lastToggleState == HIGH) {
    measureEnabled = !measureEnabled;
    Serial.println(measureEnabled ? "Measurement resumed" : "Measurement paused");
    delay(300);
  }

  // Garbage collected
  if (collectState == LOW && lastCollectState == HIGH) {
    Serial.println("Garbage collected! Sending update...");
    sendCollectedStatus();

    digitalWrite(whiteLED, HIGH);
    delay(2000); // show white light for 2 seconds
    digitalWrite(whiteLED, LOW);

    delay(300);
  }

  lastToggleState = toggleState;
  lastCollectState = collectState;
}

// -------- Ultrasonic Measurement --------
int readDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2; // cm

  // Serial.print("Distance: ");
  // Serial.print(distance);
  // Serial.println(" cm");
  return distance;
}

// -------- LED for Garbage Level --------
void handleLEDForLevel(int distance) {
   int sensorHeight = sensorDistance;   // cm
  int binHeight = dustbinHeight;
  // assume bin height = 24
  int garbageHeight = sensorHeight - distance;
  garbageHeight = constrain(garbageHeight, 0, sensorDistance-1);

  int fillLevel = (garbageHeight * 100) / binHeight;
 
  // fillLevel = constrain(fillLevel, 0, 100);

  Serial.print("Fill level: ");
  Serial.print(fillLevel);
  Serial.println("%");

  // Turn off both indicator LEDs first
  digitalWrite(yellowLED, LOW);
  digitalWrite(redFullLED, LOW);

  if (fillLevel < 80) {
    digitalWrite(yellowLED, HIGH); // Low level
  } else {
    digitalWrite(redFullLED, HIGH); // Full bin
  }
}

// -------- Send Distance to Backend --------
void sendDistance(int distance) {
  int heightPer = constrain(distance, 0,200);
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  HTTPClient http;
  http.begin(client,serverUrl);
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"binId\": \"BIN_001\", \"fillLevel\": " + String(heightPer) + ",\"gasLevel\":" + String(gasLevel) + "}";

  int httpCode = http.POST(payload);
  if(httpCode > 0){
  Serial.print("Distance sent -> Code: ");
  Serial.println(httpCode);

  }else
  {
     Serial.print("Error sending data");
  }

  http.end();
}

// -------- Send Garbage Collected Status --------
void sendCollectedStatus() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  HTTPClient http;
  http.begin(client,collectedUrl);
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"binId\": \"BIN_001\", \"collected\": true}";

  int httpCode = http.POST(payload);
  if(httpCode > 0){
  Serial.print("Collected status sent -> Code: ");
  Serial.println(httpCode);

  }else
  {
     Serial.print("Error sending data");
  }


  http.end();
}
