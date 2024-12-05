import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <ul>
        <li><Link to="/vendor">Vendor</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/user">User</Link></li>
      </ul>
    </div>
  );
}

export default Login;
