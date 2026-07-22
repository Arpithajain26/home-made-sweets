import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './features/auth/components/AuthModal';
import Cursor3DEffect from './components/common/Cursor3DEffect';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Cursor3DEffect />
        <div className="flex flex-col min-h-screen bg-amber-50 text-amber-950">
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