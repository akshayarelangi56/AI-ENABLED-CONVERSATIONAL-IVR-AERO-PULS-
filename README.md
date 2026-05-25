# AI-ENABLED-CONVERSATIONAL-IVR-AERO-PULS-


> A smart, multilingual aviation assistance platform combining a real-time web dashboard with a voice-enabled IVR system and automated SMS notifications.


## 📖 Overview

**Skysync** is a full-stack aviation service platform that simplifies passenger interactions through a unified web dashboard and AI-powered voice IVR system. It supports 9 regional Indian languages, provides real-time flight and PNR tracking, and sends automated SMS notifications — eliminating traditional helpdesk delays.

---

## 🚩 Problem Statement

Modern aviation support systems fail passengers in key areas:

- **Language Barriers** — Most IVR systems are English-only, excluding regional language speakers
- **Connectivity Dependency** — Travel apps break in low-signal zones with no offline fallback
- **Fragmented Interfaces** — Critical info is scattered across multiple platforms
- **Slow Human Support** — Manual helplines have long wait times and inconsistent quality during peak hours

---

## 🎯 Key Features

- 🌐 **Multilingual IVR** — Voice support in 9 regional Indian languages (Hindi, Telugu, Tamil, and more)
- 📊 **Real-Time Web Dashboard** — Live flight data, PNR tracking, and airport amenity discovery
- 📞 **Web-to-Call Bridge** — Trigger real mobile calls directly from the web dashboard via Twilio
- 📲 **Automated 3-Stage SMS Workflow** — Notifications at menu selection, sub-option, and booking confirmation
- 🤖 **Automated Service Modules** — Booking, PNR status, baggage assistance, check-in, and more — all voice-driven
- ⚡ **Near-Instant Response** — < 2.5 second trigger-to-call latency

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, JavaScript |
| **Backend** | Node.js, Express.js |
| **Telephony & IVR** | Twilio API, Twilio Gather |
| **Voice Recognition** | Web Speech API |
| **SMS Notifications** | Twilio SMS |
| **Tunneling** | Ngrok (local-to-cloud) |

---

## 🏗️ System Architecture

The platform follows a **modular hybrid architecture** with five core components:

1. **Web Dashboard** — High-fidelity React interface with real-time flight tables and sidebar for airport amenities
2. **Voice-Telephony Bridge** — Bidirectional link between the Node.js backend and Twilio, enabling dashboard-triggered mobile calls via webhooks
3. **Multilingual IVR Engine** — Dynamic IVR using specialized speech-recognition parameters across 9 regional languages with native-voice responses
4. **Automated SMS Gateway** — Proactive 3-tier notification system triggered at key service state changes
5. **Async Navigation Control** — Hands-free browser navigation synchronized with voice commands via asynchronous JS logic

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A [Twilio account](https://www.twilio.com/) (free trial works)
- [Ngrok](https://ngrok.com/) installed globally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skysync.git
cd skysync
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Twilio Credentials
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# Server
PORT=5000
```

> You can find your `ACCOUNT_SID` and `AUTH_TOKEN` in the [Twilio Console](https://console.twilio.com/).

### 4. Start Ngrok (for local Twilio webhooks)

In a separate terminal:

```bash
ngrok http 5000
```

Copy the generated `https://` URL and set it as your webhook URL in the Twilio Console under **Phone Numbers → Active Numbers → Voice Configuration**.

### 5. Run the App

```bash
# Start the backend server
npm run server

# Start the React frontend (in a new terminal)
npm run client

# Or run both together (if concurrently is configured)
npm run dev
```

### 6. Open in Browser

```
http://localhost:3000
```

---

## 📊 Performance Results

| Metric | Result |
|--------|--------|
| Trigger-to-Call Latency | **< 2.5 seconds** |
| Regional Language Recognition Accuracy | **94%** |
| SMS Delivery Success Rate | **100%** (tested under low-bandwidth) |
| Core Aviation Modules Automated | **9 / 9** |
| Browser Hang Issues | **Eliminated** via async processing |

---

## 📁 Project Structure

```
skysync/
├── client/              # React.js frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   └── App.js
│   └── package.json
├── server/              # Node.js + Express backend
│   ├── routes/          # API and webhook routes
│   ├── ivr/             # Twilio IVR logic
│   └── sms/             # SMS notification engine
├── .env                 # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚠️ Important

Make sure `.env` is listed in your `.gitignore` so your Twilio credentials are never pushed to GitHub:

```
# .gitignore
.env
node_modules/
```

---

## 🔮 Future Enhancements

- **Conversational AI** — Advanced NLP for context-aware, natural dialogue
- **Voice-Based Payments** — Secure in-call transaction support
- **Omnichannel Support** — WhatsApp and rich messaging integration
- **Predictive Analytics** — Personalized passenger recommendations
- **IoT Integration** — Smart airport connectivity

---

## ✅ Conclusion

Skysync demonstrates that modern web technologies and cloud telephony can be combined to build a scalable, inclusive, and real-time aviation support system — replacing fragmented, English-only helplines with a unified, voice-driven, multilingual platform.
