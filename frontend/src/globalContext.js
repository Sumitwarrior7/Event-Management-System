import React, { createContext, useState, useEffect } from "react";

// Create the context
export const GlobalContext = createContext();

// Context provider component
export const GlobalProvider = ({ children }) => {
  // Initialize the state from localStorage or use default values
  const [globalState, setGlobalState] = useState(() => {
    const savedState = localStorage.getItem("globalState");
    return savedState ? JSON.parse(savedState) : {};
  });

  // Enhanced state updater with persistence
  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      localStorage.setItem("globalState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(globalState));
  }, [globalState]);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState: updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
