import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleVoiceCall = () => {
    alert("Initiating Twilio Voice Call to your mobile...");
    // Future: Logic to trigger backend/twilio
  };

  const handleVoiceWeb = () => {
    navigate('/voice-web'); // Redirects to the new page
  };

  return (
    <div className="sidebar">
      <div className="logo">✈️ AeroPulse</div>
      
      <div className="airport-services">
        <p style={{fontSize: '12px', color: '#8892b0', marginBottom: '20px'}}>AIRPORT SERVICES</p>
        <button className="service-btn">🛍️ Duty Free Luxe (T3)</button>
        <button className="service-btn">🧸 Hamleys Toys & Gifts</button>
        <button className="service-btn">☕ Starbucks Reserve</button>
        <button className="service-btn">🔌 Reliance Digital Store</button>
        <button className="service-btn">🛋️ Plaza Premium Lounge</button>
        <button className="service-btn">🍱 Global Food Court</button>
      </div>

      <div className="voice-actions">
        <button className="btn-primary" onClick={handleVoiceCall}>
          📞 Start Voice Booking
        </button>
        <button className="btn-primary" style={{backgroundColor: '#1d4ed8'}} onClick={handleVoiceWeb}>
          🌐 Start Voice Web
        </button>
      </div>
    </div>
  );
};

export default Sidebar;