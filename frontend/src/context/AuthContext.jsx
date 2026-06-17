import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pharma_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); }
      catch { localStorage.removeItem('pharma_user'); }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock auth — replace with real API call
    if (email && password.length >= 4) {
      const fakeUser = {
        id: 1,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        role: 'Pharmacien',
        initials: email.slice(0, 2).toUpperCase(),
      };
      setUser(fakeUser);
      localStorage.setItem('pharma_user', JSON.stringify(fakeUser));
      return { success: true };
    }
    return { success: false, message: 'Identifiants incorrects.' };
  };

  const register = async (name, email, password) => {
    // Mock register
    if (name && email && password.length >= 6) {
      const newUser = {
        id: Date.now(),
        name,
        email,
        role: 'Pharmacien',
        initials: name.slice(0, 2).toUpperCase(),
      };
      setUser(newUser);
      localStorage.setItem('pharma_user', JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, message: 'Veuillez remplir tous les champs correctement.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharma_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
