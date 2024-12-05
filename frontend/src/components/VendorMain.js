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
          <li><Link to="your-item">Your Item</Link></li>
          <li><Link to="add-new-item">Add New Item</Link></li>
          <li><Link to="transaction">Transaction</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="your-item" element={<YourItem />} />
        <Route path="add-new-item" element={<AddNewItem />} />
        <Route path="transaction" element={<Transaction />} />
      </Routes>
    </div>
  );
}

export default VendorMain;
