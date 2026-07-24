import React, { useState, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './features/auth/components/AuthModal';
import SplashScreen from './components/common/SplashScreen';

const App: React.FC = () => {
  // Show splash only once per browser session
  const [showSplash, setShowSplash] = useState(() => {
    if (sessionStorage.getItem('splashShown')) return false;
    return true;
  });

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('splashShown', '1');
    setShowSplash(false);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#2C1609]">
          <TopBar />
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
        {/* Global auth modal — rendered outside main flow so it overlays everything */}
        <AuthModal />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;