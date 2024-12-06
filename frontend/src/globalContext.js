import React, { createContext, useState } from "react";

// Create the context
export const GlobalContext = createContext();

// Context provider component
export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    role: "user",
    name: "",
    email: "",
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
