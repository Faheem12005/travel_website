import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const cookie = Cookies.get("authToken");
    if (cookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // The server sets the cookie, so just update the state
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("authToken"); // You might want to handle this on the server-side as well
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};