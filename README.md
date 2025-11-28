<h1>🗑️ Smart Waste Management System</h1>

An IoT-based Smart Dustbin Project using ESP8266, Ultrasonic Sensor, Node.js + Express, MongoDB, and Socket.IO to monitor garbage levels, detect garbage collection, and send real-time alerts when the bin reaches 80% full.

🚀 Features
✔️ ESP8266 (IoT Hardware)

Measures garbage level every 10 seconds

Sends sensor data (fill-level & gas level) to backend

Toggle button to pause/resume measurement

Collection button to send garbage collected status

Full LED indication system:

🟢 Green → Measuring ON

🔴 Red → Measuring OFF

⚪ White → Garbage collected

🟡 Yellow → Garbage low

🔥 Red Full LED → Garbage > 80%

✔️ Backend (Node.js + Express)

Stores bin data in MongoDB

Receives sensor updates from ESP8266

Sends real-time alerts to frontend via Socket.IO

Notifies:

⚠️ Bin Full (>80%)

✔️ Garbage Collected

✔️ MongoDB Database

Stores:

Bin ID

Fill Level

Gas Level

Timestamp

Garbage collection events

✔️ Frontend

Connects to backend via Socket.IO

Displays real-time alerts and notifications

Shows bin status and history

📁 Project Structure
