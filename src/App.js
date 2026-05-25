import React, { useState } from 'react';
import Dashboard from './pages/Dashboard'; 
import VoiceWeb from './pages/VoiceWeb'; 
import PNRStatus from './components/PNRStatus'; // Added for the tracking page

function App() {
    // State to manage which view is active
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [activePnr, setActivePnr] = useState('');

    /**
     * handleNavigation: Switches between pages based on button clicks
     */
    const handleNavigation = (target, pnr = '') => {
        if (pnr) {
            setActivePnr(pnr);
        }
        setCurrentPage(target);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return (
                    /* Matches your dark-themed dashboard UI.
                       Features: Airport amenities (left), Welcome/Radar (center), 
                       World Clocks (right).
                    */
                    <Dashboard 
                        onNavigate={handleNavigation} 
                        externalPnr={activePnr} 
                    />
                );
            case 'voiceweb':
                return (
                    /* Redirects to the Voice Web UI you previously created.
                       Matches the dark blue UI with mic and language buttons.
                    */
                    <VoiceWeb 
                        onNavigate={handleNavigation} 
                    />
                );
            case 'pnr-tracking':
                return (
                    /* Redirects to the AeroPulse white-themed tracking page.
                       Triggered by clicking the 'Track Status' button.
                    */
                    <PNRStatus 
                        pnrId={activePnr}
                        onNavigate={handleNavigation}
                    />
                );
            default:
                return <Dashboard onNavigate={handleNavigation} />;
        }
    };

    return (
        <div className="App" style={{ margin: 0, padding: 0, minHeight: '100vh', background: '#070b14' }}>
            {renderPage()}
        </div>
    );
}

export default App;