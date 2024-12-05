import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import VendorMain from './components/VendorMain';
import AdminMain from './components/AdminMain';
import UserMain from './components/UserMain';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/vendor/*" element={<VendorMain />} />
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/user/*" element={<UserMain />} />
      </Routes>
    </div>
  );
}

export default App;
