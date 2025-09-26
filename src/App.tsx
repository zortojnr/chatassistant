import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);

  const handleLogin = (userData: AuthUser) => {
    setHasLoggedInBefore(true);
    setUser(userData);
  };

  const handleSignUp = (userData: any) => {
    console.log('Handling signup:', userData);
    
    // Create a proper AuthUser object from signup data
    const authUser = {
      id: Date.now().toString(),
      studentId: userData.studentId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      faculty: userData.faculty || 'Faculty of Computing',
      level: userData.level,
      year: userData.year,
      phoneNumber: userData.phoneNumber,
      studentType: userData.studentType,
      department: userData.department
    };
    
    console.log('Created auth user:', authUser);
    setUser(authUser);
  };

  const handleAdminLogin = (adminData: any) => {
    console.log('App.tsx - handleAdminLogin called with:', adminData);
    setHasLoggedInBefore(true);
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    setShowSignUp(false);
    setShowAdminLogin(false);
    // Keep hasLoggedInBefore as true to prevent animations on subsequent logins
  };

  const handleBackToLogin = () => {
    setShowSignUp(false);
    setShowAdminLogin(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showAdminLogin && !admin ? (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onBack={handleBackToLogin}
          key="admin-login"
        />
      ) : showSignUp && !user ? (
        <SignUpScreen 
          onBack={handleBackToLogin}
          onSignUp={handleSignUp}
          key="signup"
        />
      ) : admin ? (
        <AdminDashboard 
          onLogout={handleLogout} 
          key="admin-dashboard"
        />
      ) : !user ? (
        <LoginScreen 
          onLogin={handleLogin} 
          onSignUp={() => setShowSignUp(true)}
          onAdminLogin={() => setShowAdminLogin(true)}
          hasLoggedInBefore={hasLoggedInBefore}
          key="login"
        />
      ) : (
        <ChatInterface 
          userData={user} 
          onLogout={handleLogout}
          key="chat"
        />
      )}
    </AnimatePresence>
  );
}

export default App;
