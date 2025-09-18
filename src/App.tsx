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
    setShowSignUp(false);
    setShowAdminLogin(false);
  };

  const handleBackToLogin = () => {
    setShowSignUp(false);
    setShowAdminLogin(false);
  };

  return (
    <>
      <PreLoginAnimation />
      {showAdminLogin ? (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onBack={handleBackToLogin}
        />
      ) : showSignUp ? (
        <SignUpScreen 
          onBack={handleBackToLogin}
          onSignUp={handleSignUp}
        />
      ) : admin ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : !user ? (
        <LoginScreen 
          onLogin={handleLogin} 
          onSignUp={() => setShowSignUp(true)}
          onAdminLogin={() => setShowAdminLogin(true)}
        />
      ) : (
        <ChatInterface userData={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
