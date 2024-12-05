import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Vendor from './User/Vendor';
import Cart from './User/Cart';
import GuestList from './User/GuestList';
import OrderStatus from './User/OrderStatus';

function UserMain() {
  return (
    <div>
      <h1>User Main Page</h1>
      <nav>
        <ul>
          <li><Link to="vendor">Vendor</Link></li>
          <li><Link to="cart">Cart</Link></li>
          <li><Link to="guest-list">Guest List</Link></li>
          <li><Link to="order-status">Order Status</Link></li>
        </ul>
      </nav>

    </div>
  );
}

export default UserMain;
