import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <ul>
        <li><Link exact to="/vendor">Vendor</Link></li>
        <li><Link exact to="/admin">Admin</Link></li>
        <li><Link exact to="/user">User</Link></li>
      </ul>
    </div>
  );
}

export default Login;
