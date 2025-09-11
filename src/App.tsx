import React from 'react';
import { useState } from 'react';
import PreLoginAnimation from './components/PreLoginAnimation';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ChatInterface from './components/ChatInterface';
import { UserData } from './types/user';

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [showPreLogin, setShowPreLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  const handleSignUp = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowPreLogin(true);
    setShowSignUp(false);
  };

  if (showPreLogin) {
    return (
      <PreLoginAnimation 
        onComplete={() => setShowPreLogin(false)} 
      />
    );
  }

  if (showSignUp) {
    return (
      <SignUpScreen 
        onBack={() => setShowSignUp(false)}
        onSignUp={handleSignUp}
      />
    );
  }

  if (!user) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        onSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <ChatInterface userData={user} onLogout={handleLogout} />
  );
}

export default App;
