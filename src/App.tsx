import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './features/auth/components/AuthModal';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
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