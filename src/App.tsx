import React from 'react';
import { useState } from 'react';
import PreLoginAnimation from './components/PreLoginAnimation';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ChatInterface from './components/ChatInterface';
import { AuthUser } from './types/user';

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [showPreLogin, setShowPreLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleLogin = (userData: AuthUser) => {
    setUser(userData);
  };

  const handleSignUp = (userData: any) => {
    setUser(userData);
  };

  const handleAdminLogin = (adminData: any) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    setShowPreLogin(true);
    setShowSignUp(false);
    setShowAdminLogin(false);
  };

  const handleBackToLogin = () => {
    setShowPreLogin(true);
    setShowSignUp(false);
    setShowAdminLogin(false);
  };

  if (showPreLogin) {
    return (
      <PreLoginAnimation 
        onComplete={() => setShowPreLogin(false)} 
      />
    );
  }

  if (showAdminLogin) {
    return (
      <AdminLogin 
        onLogin={handleAdminLogin}
        onBack={handleBackToLogin}
      />
    );
  }

  if (showSignUp) {
    return (
      <SignUpScreen 
        onBack={handleBackToLogin}
        onSignUp={handleSignUp}
      />
    );
  }

  if (admin) {
    return (
      <AdminDashboard onLogout={handleLogout} />
    );
  }

  if (!user) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        onSignUp={() => setShowSignUp(true)}
        onAdminLogin={() => setShowAdminLogin(true)}
      />
    );
  }

  return (
    <ChatInterface userData={user} onLogout={handleLogout} />
  );
}

export default App;
