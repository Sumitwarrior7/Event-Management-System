import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalContext } from "./globalContext"; // Import Global Context
import Login from "./components/Login";
import VendorMain from "./components/VendorMain";
import AdminMain from "./components/AdminMain";
import UserMain from "./components/UserMain";
import Home from "./components/home";
import YourItem from "./components/Vendor/youritem";
import AddNewItem from "./components/Vendor/AddNewItem";
import Transaction from "./components/Vendor/Transaction";
import Cart from "./components/User/Cart";
import GuestList from "./components/User/GuestList";
import OrderStatus from "./components/User/OrderStatus";
import Vendor from "./components/User/Vendor";
import VendorList from "./components/Vendor/vendors";
import AdminDashboard from "./components/Admin/adminDashboard";
import VendorDashboard from "./components/Vendor/vendorDashboard";
import AddEvent from "./components/User/AddEvent";
import Signup from "./components/register";
import VendorDetails from "./components/User/SeeVendor";
import "./input.css";
function App() {
  const { globalState } = useContext(GlobalContext); // Access global state
  const { role } = globalState; // Get role from context
  console.log("main app",role);

  return (
    <div>
      <Routes>
        {/* Common Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/vendor" element={<VendorMain />} />
        <Route exact path="/admin" element={<AdminMain />} />
        <Route exact path="/user" element={<UserMain />} />
        <Route exact path="/register" element={<Signup />} />

        {/* User-Specific Routes */}
        {role === "user" && (
          <>
            <Route exact path="/user" element={<UserMain />} />
            <Route exact path="/user/cart" element={<Cart />} />
            <Route exact path="/user/guest-list" element={<GuestList />} />
            <Route exact path="/user/vendor" element={<Vendor />} />
            <Route exact path="/user/add-event" element={<AddEvent />} />
            <Route path="/user/see-vendor/:vendor_id" element={<VendorDetails />} />
          </>
        )}

        {/* Vendor-Specific Routes */}
        {role === "vendor" && (
          <>
            <Route exact path="/vendor/vendor-list" element={<VendorList />} />
            <Route exact path="/vendor" element={<VendorDashboard />} />
            <Route exact path="/vendor/your-item" element={<YourItem />} />
            <Route exact path="/vendor/add-new-item" element={<AddNewItem />} />
            <Route exact path="/vendor/transaction" element={<Transaction />} />
            <Route exact path="/vendor/order-status" element={<OrderStatus />} />
            <Route exact path="/vendor/dashboard" element={<VendorDashboard />} />
          </>
        )}

        {/* Admin-Specific Routes */}
        {role === "admin" && (
          <>
            <Route exact path="/admin" element={<AdminDashboard />} />
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          </>
        )}

        {/* Redirect to Login if Unauthorized */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
