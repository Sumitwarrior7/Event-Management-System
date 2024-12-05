import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import YourItem from './Vendor/youritem';
import AddNewItem from './Vendor/AddNewItem';
import Transaction from './Vendor/Transaction';

function VendorMain() {
  return (  
    <div>
      <h1>Vendor Main Page</h1>
      <nav>
        <ul>
          <li><Link to="/vendor/your-item">Your Item</Link></li>
          <li><Link to="/vendor/add-new-item">Add New Item</Link></li>
          <li><Link to="/vendor/transaction">Transaction</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default VendorMain;
