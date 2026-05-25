const express = require('express');
const router = express.Router();

// Mock database for your project
const mockBookings = [
  {
    pnr: "AP123456",
    from: "Delhi (DEL)",
    to: "Hyderabad (HYD)",
    miles: "780 miles",
    weather: "28°C Clear Skies",
    seat: "12A",
    meal: "Veg Platter",
    class: "Economy"
  }
];

router.post('/track', (req, res) => {
  const { pnr } = req.body;
  const flight = mockBookings.find(b => b.pnr === pnr);

  if (flight) {
    res.json({ success: true, data: flight });
  } else {
    res.status(404).json({ success: false, message: "Invalid PNR number entered." });
  }
});

module.exports = router;