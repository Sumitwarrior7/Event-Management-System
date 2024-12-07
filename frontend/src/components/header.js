import React, { useContext } from "react";
import { GlobalContext } from "../globalContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout, globalState } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Reset state and clear localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Prakash Events</h1>
      {/* Display Name and Role */}
      {globalState.name && globalState.role && (
        <div className="flex items-center space-x-4">
          <span className="font-semibold">{globalState.name}</span>
          <span className="text-sm text-gray-200">{globalState.role}</span>
        </div>
      )}
      <button
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
