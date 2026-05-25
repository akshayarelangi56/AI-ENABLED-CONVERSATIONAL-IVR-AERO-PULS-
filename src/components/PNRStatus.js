import React from 'react';

const PNRStatus = ({ pnrId, onNavigate }) => {
    // Demo data for your 4 trained PNRs with dense information
    const flightDetails = {
        "SKY789": { flight: "SS 234", seat: "14A", from: "JFK", to: "LAX", dep: "10:45 AM", arr: "1:50 PM", gate: "B12", aircraft: "Boeing 787-9 Dreamliner", duration: "6h 05m", baggage: "30kg (Checked) + 7kg (Cabin)" },
        "SYNC456": { flight: "SS 556", seat: "08C", from: "LHR", to: "BOM", dep: "01:15 PM", arr: "05:30 AM", gate: "C02", aircraft: "Airbus A350-1000", duration: "9h 15m", baggage: "35kg (Checked) + 7kg (Cabin)" },
        "TRK123": { flight: "SS 109", seat: "22F", from: "DXB", to: "SIN", dep: "09:00 AM", arr: "08:45 PM", gate: "A15", aircraft: "Boeing 777-300ER", duration: "7h 45m", baggage: "30kg (Checked) + 7kg (Cabin)" },
        "FLY999": { flight: "SS 777", seat: "01A", from: "DEL", to: "SFO", dep: "11:55 PM", arr: "10:10 AM", gate: "D01", aircraft: "Airbus A380-800", duration: "15h 15m", baggage: "40kg (Checked) + 10kg (Cabin)" }
    };

    const data = flightDetails[pnrId] || flightDetails["SKY789"];

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', color: '#1e293b' }}>
            
            {/* BRANDING HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h1 style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '32px', letterSpacing: '1px' }}>
                    ✈ SkySync AI
                </h1>
                <p style={{ color: '#64748b', fontSize: '12px', marginTop: '-5px' }}>INTELLIGENT FLIGHT OPERATIONAL SYSTEM</p>
            </div>

            <div style={{ maxWidth: '850px', margin: '0 auto', background: 'white', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', padding: '35px' }}>
                
                {/* STATUS PROGRESS BAR */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px', borderBottom: '1px solid #f1f5f9', paddingBottom: '25px' }}>
                    {['Booking Confirmed', 'Checked-in', 'Boarding', 'Departed'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: i < 3 ? '#15803d' : '#94a3b8', fontWeight: '600' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: i < 3 ? '#dcfce7' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {i < 3 ? '✔' : ''}
                            </div>
                            {step}
                        </div>
                    ))}
                </div>

                {/* PNR IDENTIFIER BAR */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ background: '#f1f5f9', padding: '12px 28px', borderRadius: '12px', fontWeight: '800', fontSize: '16px', border: '1px solid #e2e8f0' }}>
                        <span style={{ color: '#15803d' }}>✔ PNR: {pnrId}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                        TICKET ISSUED: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* MAIN FLIGHT CARD */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '30px', marginBottom: '30px', background: 'linear-gradient(to bottom right, #ffffff, #fcfdfe)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '50px', height: '50px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👤</div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>John Doe</h3>
                                <span style={{ color: '#15803d', fontSize: '13px', fontWeight: '700' }}>✔ STATUS: CHECKED IN (ZONE 2)</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0ea5e9' }}>FLIGHT STATUS: <span style={{ color: '#15803d' }}>ON TIME</span></div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>DURATION: {data.duration}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>AIRCRAFT: {data.aircraft}</div>
                        </div>
                    </div>

                    {/* GRAPHICAL PATH */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                        <div style={{ textAlign: 'left', flex: '0 0 150px' }}>
                            <div style={{ fontWeight: '900', fontSize: '24px', letterSpacing: '-0.5px' }}>{data.from}</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '4px' }}>{data.dep}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Terminal 4 | Gate {data.gate}</div>
                        </div>
                        
                        <div style={{ flex: 1, height: '2px', background: '#15803d', margin: '0 30px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '10px', height: '10px', background: '#15803d', borderRadius: '50%', position: 'absolute', left: '-5px' }}></div>
                            <div style={{ background: 'white', padding: '0 15px', zIndex: 1, fontSize: '28px', color: '#15803d', transform: 'rotate(0deg)' }}>✈</div>
                            <div style={{ width: '10px', height: '10px', background: '#cbd5e1', borderRadius: '50%', position: 'absolute', right: '-5px' }}></div>
                        </div>

                        <div style={{ textAlign: 'right', flex: '0 0 150px' }}>
                            <div style={{ fontWeight: '900', fontSize: '24px', letterSpacing: '-0.5px' }}>{data.to}</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '4px' }}>{data.arr}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Terminal 5 | Gate 42</div>
                        </div>
                    </div>
                </div>

                {/* SECONDARY INFO GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                    {/* LEFT PANEL: SEATING & CLASS */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px' }}>
                        <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#0ea5e9', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>Reservation Details</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>💺 Seat Assignment</span>
                                <span style={{ fontWeight: '800' }}>{data.seat} (Window)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>💼 Travel Class</span>
                                <span style={{ fontWeight: '800' }}>Economy Plus</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>🧳 Baggage Allowance</span>
                                <span style={{ fontWeight: '800', fontSize: '12px' }}>{data.baggage}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>🍔 Special Request</span>
                                <span style={{ fontWeight: '800' }}>Vegetarian (VGML)</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: BOARDING PASS / QR */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px', textAlign: 'center', background: '#fcfdfe' }}>
                        <div style={{ background: '#dcfce7', color: '#15803d', padding: '8px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', marginBottom: '15px' }}>DIGITAL BOARDING PASS READY</div>
                        <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>REF: SKY-AI-8829</div>
                        <div style={{ background: 'white', padding: '15px', borderRadius: '15px', display: 'inline-block', border: '1px solid #f1f5f9' }}>
                            {/* Visual QR Simulator */}
                            <div style={{ width: '85px', height: '85px', background: '#1e293b', borderRadius: '4px' }}></div>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '10px' }}>SCAN AT GATE {data.gate}</div>
                    </div>
                </div>

                {/* SERVICES INCLUDED (DENSE VERSION) */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px', background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#0ea5e9' }}>SkySync Exclusive Services</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🍽 Full Course Hot Meal</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🌐 Premium Wi-Fi Connected</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🎬 1000+ Hours Entertainment</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>⚡ In-Seat Power & USB</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🥂 Priority Lounge Access</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🛌 Travel Kit & Blanket</div>
                    </div>
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
                    Need Assistance? <span style={{ color: '#0ea5e9', fontWeight: 'bold', cursor: 'pointer' }}>SkySync Support: +1 800-SKY-SYNC</span>
                </div>

                <button 
                    onClick={() => onNavigate('dashboard')}
                    style={{ marginTop: '25px', width: '100%', padding: '16px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '800', fontSize: '15px', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)' }}
                >
                    RETURN TO DASHBOARD
                </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px', color: '#cbd5e1', fontWeight: 'bold', letterSpacing: '4px', fontSize: '12px' }}>
                SKY-SYNC • AI-POWERED AVIATION
            </div>
        </div>
    );
};

export default PNRStatus;