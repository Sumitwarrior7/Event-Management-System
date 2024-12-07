import React, { createContext, useState, useEffect } from "react";

// Create the context
export const GlobalContext = createContext();

// Context provider component
export const GlobalProvider = ({ children }) => {
  // Initialize the state from localStorage or use default values
  const [globalState, setGlobalState] = useState(() => {
    const savedState = localStorage.getItem("globalState");
    return savedState
      ? JSON.parse(savedState)
      : { role: null, email: null, name: null }; // Default role, email, and name as null
  });

  // Enhanced state updater with persistence
  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      localStorage.setItem("globalState", JSON.stringify(updatedState)); // Persist updated state
      return updatedState;
    });
  };

  // Logout function to reset globalState and clear localStorage
  const logout = () => {
    setGlobalState({ role: null, email: null, name: null }); // Reset state
    localStorage.removeItem("globalState"); // Clear persisted state
  };

  // Persist state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(globalState));
  }, [globalState]);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState: updateGlobalState, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
