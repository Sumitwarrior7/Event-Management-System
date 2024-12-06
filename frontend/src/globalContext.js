import React, { createContext, useState } from "react";

// Create the context
export const GlobalContext = createContext();

// Context provider component
export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    role: "tan", // Default role
    name: "",
    email: "",
  });

  // Enhanced state updater
  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => {
      // Only update the role if it's not already set
      const updatedRole =newState.role;
      return { ...prevState, ...newState, role: updatedRole };
    });
  };

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState: updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
