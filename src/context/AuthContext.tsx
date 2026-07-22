import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  /** Open the auth modal (optionally pre-select 'signin' or 'signup') */
  openAuthModal: (tab?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  authModalOpen: boolean;
  authModalTab: 'signin' | 'signup';
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const login = useCallback((u: AuthUser) => {
    setUser(u);
    setAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const openAuthModal = useCallback((tab: 'signin' | 'signup' = 'signin') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, openAuthModal, closeAuthModal, authModalOpen, authModalTab }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
