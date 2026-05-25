import React, { useState } from 'react';

const Dashboard = ({ onNavigate }) => { 
    const [pnrInput, setPnrInput] = useState('');

    // REQUIRED CONFIG: Update with your details
    const NGROK_URL = "https://consortable-thurman-nonstatistical.ngrok-free.dev"; 
    const MY_PHONE_NUMBER = "+917893586789"; 

    const triggerVoiceCall = async () => {
        try {
            const response = await fetch(`${NGROK_URL}/make-call`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: MY_PHONE_NUMBER }) 
            });
            const data = await response.json();
            if (response.ok) {
                alert("SkySync AI: Voice Call Session Initiated!");
            } else {
                alert("Call Error: " + (data.message || "Credential Mismatch"));
            }
        } catch (err) {
            alert("Connection error. Ensure 'node server.js' and 'ngrok' are running.");
        }
    };

    const handleTrackStatus = () => {
        const VALID_PNRS = ["SKY789", "SYNC456", "TRK123", "FLY999"];
        const upperPnr = pnrInput.toUpperCase().trim();
        if (VALID_PNRS.includes(upperPnr)) {
            onNavigate('pnr-tracking', upperPnr); 
        } else {
            alert("Tracking Alert: PNR Not Found or Invalid format."); 
        }
    };

    // Helper to generate realistic random flight data for the radar
    const radarData = [...Array(20)].map((_, i) => {
        const terminals = ["T1", "T2", "T3", "T4", "INTL"];
        return {
            id: `AI-${100 + i}`,
            route: i % 2 === 0 ? "BOM ➔ LHR" : "DEL ➔ JFK",
            terminal: terminals[Math.floor(Math.random() * terminals.length)],
            miles: Math.floor(Math.random() * (5000 - 400 + 1)) + 400,
            status: i % 4 === 0 ? 'DELAY' : 'ON TIME'
        };
    });

    return (
        <div style={{ background: '#070b14', height: '100vh', display: 'flex', color: '#e2e8f0', fontFamily: 'serif', overflow: 'hidden' }}>
            
            {/* 1. LEFT PANEL: COMPLETELY FILLED AMENITIES (STAYING SAME) */}
            <div style={{ width: '280px', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                <h3 style={{ color: '#3b82f6', fontSize: '11px', letterSpacing: '2px', marginBottom: '15px' }}>AIRPORT AMENITIES</h3>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', marginBottom: '15px', paddingRight: '5px' }}>
                    {[ "Reliance Digital", "Plaza Lounge", "Global Food Court", "Medical Center", "ATM / Currency", "Duty Free Luxe", "Hamleys Toys", "Starbucks Reserve", "Premium Car Rental", "Business Center", "Spa & Wellness", "Kids Play Zone", "Prayer Room", "Smoking Lounge", "Lost & Found", "Pet Relief Area" ].map(item => (
                        <div key={item} style={{ background: '#111827', padding: '10px', borderRadius: '5px', fontSize: '11px', border: '1px solid #1e293b' }}>{item}</div>
                    ))}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={triggerVoiceCall} style={{ background: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>📞 START VOICE CALL</button>
                    <button onClick={() => onNavigate('voiceweb')} style={{ background: '#1e3a8a', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>🌐 START VOICE WEB</button>
                </div>
            </div>

            {/* 2. CENTER PANEL: LIVE FLIGHT RADAR WITH UNIQUE DATA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
                <h1 style={{ letterSpacing: '10px', fontSize: '42px', color: '#3b82f6', margin: '0' }}>SKY-SYNC AI</h1>
                <p style={{ opacity: 0.5, marginBottom: '40px', fontSize: '12px' }}>INTELLIGENT FLIGHT OPERATIONAL SYSTEM</p>

                <div style={{ width: '80%', display: 'flex', gap: '10px', marginBottom: '40px' }}>
                    <input 
                        type="text" 
                        placeholder="ENTER PNR NUMBER..." 
                        value={pnrInput}
                        onChange={(e) => setPnrInput(e.target.value)}
                        style={{ flex: 1, background: '#111827', border: '1px solid #3b82f6', padding: '12px', color: 'white', borderRadius: '8px' }}
                    />
                    <button onClick={handleTrackStatus} style={{ background: '#3b82f6', color: 'white', padding: '0 25px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>TRACK STATUS</button>
                </div>

                <div style={{ width: '95%', flex: 1, background: '#111827', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '10px', background: '#0f172a', fontSize: '11px', color: '#60a5fa' }}>LIVE FLIGHT RADAR</div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 70px', padding: '8px 15px', fontSize: '10px', color: '#94a3b8', borderBottom: '1px solid #0f172a', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <span>Flight</span>
                        <span>Term</span>
                        <span>Miles</span>
                        <span>Status</span>
                    </div>

                    <div style={{ overflowY: 'auto', flex: 1, padding: '10px' }}>
                        {radarData.map((flight, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 70px', padding: '10px', borderBottom: '1px solid #0f172a', fontSize: '12px', alignItems: 'center' }}>
                                <span>{flight.id} {flight.route}</span>
                                <span style={{ opacity: 0.6 }}>{flight.terminal}</span>
                                <span style={{ opacity: 0.6 }}>{flight.miles} mi</span>
                                <span style={{ color: flight.status === 'DELAY' ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>{flight.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. RIGHT PANEL: COMPLETELY FILLED WORLD CLOCKS & NOTIFICATIONS (STAYING SAME) */}
            <div style={{ width: '300px', borderLeft: '1px solid #1e293b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: '#111827', padding: '15px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                    <p style={{ color: '#60a5fa', fontSize: '10px', margin: '0 0 5px 0' }}>TEMPERATURE</p>
                    <div style={{ fontSize: '24px' }}>28°C <span style={{ fontSize: '12px', opacity: 0.5 }}>Vijayawada</span></div>
                </div>

                <div style={{ background: '#111827', padding: '15px', borderRadius: '10px', border: '1px solid #1e293b', flex: '1 0 0', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: '#60a5fa', fontSize: '10px', margin: '0 0 10px 0' }}>WORLD CLOCKS</p>
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>New Delhi</span><span>10:37 AM</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>New York</span><span>08:52 AM</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>London</span><span>01:52 PM</span></div>
                        {[ ["Dubai", "05:37 PM"], ["Tokyo", "11:37 PM"], ["Singapore", "10:37 PM"], ["Moscow", "04:37 PM"], ["Paris", "02:37 PM"], ["Sydney", "12:37 AM"], ["Cairo", "03:37 PM"], ["Rio de Janeiro", "10:37 AM"] ].map(clock => (
                            <div key={clock[0]} style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}><span>{clock[0]}</span><span>{clock[1]}</span></div>
                        ))}
                    </div>
                </div>

                <div style={{ background: '#111827', padding: '15px', borderRadius: '10px', border: '1px solid #1e293b', minHeight: '120px' }}>
                    <p style={{ color: '#60a5fa', fontSize: '10px', margin: '0 0 10px 0' }}>SYSTEM NOTIFICATIONS</p>
                    <div style={{ fontSize: '10px', opacity: 0.6, lineHeight: '1.6', overflowY: 'auto', maxHeight: '80px' }}>
                        <div>[SYS] AI Voice Engine: Ready</div>
                        <div>[SYS] Twilio Node: Connected</div>
                        <div>[SYS] GDS Sync: ACTIVE</div>
                        <div>[SEC] Network: Secured</div>
                        <div>[NET] RT Data: Live Stream OK</div>
                        <div>[MOD] Radar Module: Online</div>
                        <div>[MOD] Search Module: V2.1 Active</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;