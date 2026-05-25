import React, { useState, useEffect, useRef } from 'react';

const VoiceWeb = ({ onNavigate }) => {
    const [step, setStep] = useState('idle'); 
    const [transcript, setTranscript] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [engineStatus, setEngineStatus] = useState({ status: 'IDLE', step: 'WAITING', mic: 'LOCKED' });
    
    const VALID_PNRS = ["SKY789", "SYNC456", "TRK123", "FLY999"];
    const scrollRef = useRef(null);
    const recognitionRef = useRef(null);
    const isRecognitionActive = useRef(false); // Safety flag to prevent double-start error

    // 1. SPEECH RECOGNITION SETUP
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const text = event.results[event.results.length - 1][0].transcript;
                handleVoiceInput(text);
            };

            recognitionRef.current.onstart = () => {
                isRecognitionActive.current = true;
                setIsListening(true);
                setEngineStatus(prev => ({ ...prev, status: 'LISTENING', mic: 'ACTIVE' }));
            };

            recognitionRef.current.onend = () => {
                isRecognitionActive.current = false;
                // Auto-restart if not finished
                if (step !== 'completed' && step !== 'idle') {
                    safeStartRecognition();
                }
            };

            recognitionRef.current.onerror = (event) => {
                if (event.error === 'not-allowed') {
                    setEngineStatus(prev => ({ ...prev, status: 'MIC BLOCKED', mic: 'ERROR' }));
                }
            };
        }
    }, [step]);

    // Safety function to prevent "Already Started" error
    const safeStartRecognition = () => {
        if (recognitionRef.current && !isRecognitionActive.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.log("Recognition start suppressed to prevent crash.");
            }
        }
    };

    const languages = [
        { name: 'English', native: 'English' }, { name: 'Telugu', native: 'తెలుగు' },
        { name: 'Hindi', native: 'हिन्दी' }, { name: 'Tamil', native: 'தமிழ்' },
        { name: 'Kannada', native: 'ಕನ್ನಡ' }, { name: 'Malayalam', native: 'മലയാളം' },
        { name: 'Bengali', native: 'বাংলা' }, { name: 'Marathi', native: 'ಮರಾಠಿ' },
        { name: 'Gujarati', native: 'ગુજરાતી' }, { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
    ];

    const services = [
        "Flight Booking", "Live Status", "Web Check-in", "Baggage Claim", 
        "Meal Request", "Seat Upgrade", "Refund Status", "Support", 
        "Cancel Trip", "Group Booking"
    ];

    // 2. VOICE SYNTHESIS
    const speak = (text) => {
        if (recognitionRef.current) recognitionRef.current.stop();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => {
            setEngineStatus(prev => ({ ...prev, status: 'SPEAKING', mic: 'BUSY' }));
        };

        utterance.onend = () => {
            if (step !== 'completed') {
                safeStartRecognition();
            }
        };

        window.speechSynthesis.speak(utterance);
        setTranscript(prev => [...prev, { sender: 'ai', text: text }]);
    };

    // 3. HANDLERS
    const startMicAndGreeting = () => {
        if (step === 'idle') {
            setStep('language');
            safeStartRecognition();
            speak("Welcome to SkySync AI. Please select your preferred language from the panel on the left.");
        }
    };

    const handleVoiceInput = (userInput) => {
        setTranscript(prev => [...prev, { sender: 'user', text: userInput }]);
        setEngineStatus(prev => ({ ...prev, status: 'PROCESSING', mic: 'LOCKED' }));

        setTimeout(() => {
            if (step === 'language') {
                setStep('service');
                speak(`Language set to ${userInput}. Now, please choose a service from the list on the right.`);
            } else if (step === 'service') {
                setStep('cities');
                speak(`Proceeding with ${userInput}. Please state your departure and arrival cities.`);
            } else if (step === 'cities') {
                setStep('flight_selection');
                speak("Searching... Found 2 available flights: AI-102 departing at 10:30 AM and AI-205 at 02:15 PM. Which one would you like?");
            } else if (step === 'flight_selection') {
                setStep('preferences');
                speak(`Flight ${userInput} selected. Would you like Business or Economy class? Also, mention if you have extra baggage.`);
            } else if (step === 'preferences') {
                setStep('completed');
                const pnr = VALID_PNRS[Math.floor(Math.random() * VALID_PNRS.length)];
                speak(`Booking confirmed! Your PNR is ${pnr}. Seat: 14A. Your tracking ID has been generated. You can now track this on the main dashboard.`);
                setEngineStatus({ status: 'COMPLETED', step: 'SUCCESS', mic: 'OFF' });
                setIsListening(false);
                if (recognitionRef.current) recognitionRef.current.stop();
            }
        }, 1200);
    };

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [transcript]);

    return (
        <div style={{ background: '#070b14', height: '100vh', display: 'flex', flexDirection: 'column', color: '#e2e8f0', fontFamily: 'serif' }}>
            {/* UI HEADER */}
            <div style={{ padding: '15px 25px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button onClick={() => onNavigate('dashboard')} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '20px' }}>←</button>
                <h2 style={{ fontSize: '18px', letterSpacing: '2px', margin: 0 }}>SKY-SYNC AI</h2>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* LEFT: LANGUAGES */}
                <div style={{ width: '250px', borderRight: '1px solid #1e293b', padding: '20px', overflowY: 'auto' }}>
                    <p style={{ fontSize: '10px', color: '#60a5fa', marginBottom: '15px' }}>LANGUAGES</p>
                    {languages.map(lang => (
                        <div key={lang.name} style={{ background: '#111827', padding: '12px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #1e293b', fontSize: '12px' }}>
                            <span>{lang.name}</span> <span style={{ opacity: 0.5 }}>({lang.native})</span>
                        </div>
                    ))}
                </div>

                {/* CENTER: CHAT */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d' }}>
                    <div ref={scrollRef} style={{ flex: 1, padding: '30px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {transcript.length === 0 && (
                            <div style={{ textAlign: 'center', marginTop: '20%', opacity: 0.3 }}>
                                <p>Voice Web Engine Standby...</p>
                                <p style={{ fontSize: '12px' }}>Click the microphone to begin</p>
                            </div>
                        )}
                        {transcript.map((msg, i) => (
                            <div key={i} style={{ 
                                alignSelf: msg.sender === 'ai' ? 'flex-start' : 'flex-end',
                                maxWidth: '70%', background: msg.sender === 'ai' ? '#1e293b' : '#2563eb',
                                padding: '12px 18px', borderRadius: msg.sender === 'ai' ? '0 15px 15px 15px' : '15px 15px 0 15px',
                                fontSize: '14px'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div style={{ height: '120px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button 
                            onClick={startMicAndGreeting}
                            style={{ 
                                width: '60px', height: '60px', borderRadius: '50%', border: 'none', 
                                background: isListening ? '#ef4444' : '#3b82f6', cursor: 'pointer',
                                boxShadow: isListening ? '0 0 20px #ef4444' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>{isListening ? '⏹' : '🎤'}</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT: SERVICES */}
                <div style={{ width: '300px', borderLeft: '1px solid #1e293b', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '10px', color: '#60a5fa', marginBottom: '15px' }}>SERVICES</p>
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {services.map(s => <div key={s} style={{ background: '#111827', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b', fontSize: '11px' }}>{s}</div>)}
                    </div>
                    <div style={{ background: '#0f172a', padding: '15px', borderRadius: '12px', border: '1px solid #3b82f6', marginTop: '20px' }}>
                        <p style={{ fontSize: '10px', color: '#3b82f6', margin: '0 0 10px 0' }}>ENGINE STATUS</p>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                            <div>STATUS: <span style={{ color: isListening ? '#22c55e' : '#94a3b8' }}>{engineStatus.status}</span></div>
                            <div>STEP: {engineStatus.step}</div>
                            <div>MIC: {engineStatus.mic}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceWeb;