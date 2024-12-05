import React from 'react';
import { Routes, Route, Link, Router } from 'react-router-dom';
import Login from './components/Login';
import VendorMain from './components/VendorMain';
import AdminMain from './components/AdminMain';
import UserMain from './components/UserMain';
import Home from './components/home';
import YourItem from './components/Vendor/youritem';
import AddNewItem from './components/Vendor/AddNewItem';
import Transaction from './components/Vendor/Transaction';
import Cart from './components/User/Cart';
import GuestList from './components/User/GuestList';
import OrderStatus from './components/User/OrderStatus';
import Vendor from './components/User/Vendor';
import RegisterAdmin from './components/RegisterAdmin';
import RegisterUser from './components/RegisterUser';
import RegisterVendor from './components/RegisterVendor';
function App() {
  return (
    <div>
     
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register/vendor" element={<RegisterVendor/>} />
        <Route exact path="/register/admin" element={<RegisterAdmin />} />
        <Route exact path="/register/user" element={<RegisterUser/>} />
        <Route exact path="/vendor" element={<VendorMain />} />
        <Route exact path="/admin" element={<AdminMain />} />
        <Route exact path="/user" element={<UserMain />} />
        <Route exact path="/vendor/your-item" element={<YourItem />} />
        <Route exact path="/vendor/add-new-item" element={<AddNewItem />} />
        <Route exact path="/vendor/transaction" element={<Transaction />} />
        <Route exact path="/user/vendor"  element={<Vendor />} />
        <Route exact path="user/cart"  element={<Cart />} />
        <Route exact path="/user/guest-list"  element={<GuestList />} />
        <Route exact path="/user/order-status"  element={<OrderStatus />} />
      </Routes>
    </div>
  );
}

export default App;
