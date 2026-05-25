const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ivrRoutes = require('./routes/ivr');
const pnrRoutes = require('./routes/pnr');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/ivr', ivrRoutes);
app.use('/api/pnr', pnrRoutes);

app.get('/', (req, res) => {
  res.send('AeroPulse Backend Server is Running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});