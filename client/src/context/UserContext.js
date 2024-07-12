import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(); // Create a context for user data

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const role = localStorage.getItem('role'); // Get role from local storage
    if (token && role) {
      setUser({ token, role }); // Set user state if token and role exist
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token); // Store token in local storage
    localStorage.setItem('role', role); // Store role in local storage
    setUser({ token, role }); // Update user state
  };

  const register = (token, role) => {
    localStorage.setItem('token', token); // Store token in local storage
    localStorage.setItem('role', role); // Store role in local storage
    setUser({ token, role }); // Update user state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('role'); // Remove role from local storage
    setUser(null); // Clear user state
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children} {/* Render children components */}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider }; // Export UserContext and UserProvider
