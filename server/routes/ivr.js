const express = require('express');
const router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

// 1. Initial Call Handlers: Choose Language
router.post('/welcome', (req, res) => {
  const twiml = new VoiceResponse();
  
  const gather = twiml.gather({
    input: 'speech dtmf',
    numDigits: 1,
    action: '/api/ivr/select-service', // Moves to next step after input
  });

  // The AI Dictates 10 Languages
  gather.say("Welcome to AeroPulse. For English, press 1 or say English.");
  gather.say("తెలుగు కోసం, రెండు నొక్కండి (For Telugu, press 2).");
  gather.say("हिंदी के लिए, तीन दबाएं (For Hindi, press 3).");
  gather.say("ગુજરાતી માટે, ચાર દબાવો (For Gujarati, press 4).");
  gather.say("தமிழ் மொழിക്കாக, ஐந்து அழுத்தவும் (For Tamil, press 5).");
  gather.say("മലയാളത്തിന്, ആറ് അമർത്തുക (For Malayalam, press 6).");
  gather.say("ಕನ್ನಡಕ್ಕಾಗಿ, ಏಳು ಒತ್ತಿರಿ (For Kannada, press 7).");
  // ... (Remaining 3 languages follow same pattern)

  res.type('text/xml');
  res.send(twiml.toString());
});

// 2. Service Selection (The 10 Services)
router.post('/select-service', (req, res) => {
  const twiml = new VoiceResponse();
  const selectedInput = req.body.Digits || req.body.SpeechResult;

  const gather = twiml.gather({
    input: 'speech dtmf',
    numDigits: 1,
    action: '/api/ivr/confirm-booking'
  });

  gather.say("Thank you. Now, please select a service. Press 1 for New Booking, 2 for Refund Status, 3 for PNR Tracking...");
  // Logic to dictate 10 services follows here...

  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;