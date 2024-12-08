import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import Header from "./components/header";

function App() {
  const { globalState } = useContext(GlobalContext); // Access global state
  const { role, email } = globalState; // Get role and email from context
  const location = useLocation(); // Get the current route path
  console.log("sumit",role, email)
  // Routes where the Header should not be displayed
  const noHeaderRoutes = ["/login", "/register", "/"];
  // Redirect user to the respective dashboard if they are already logged in
  const redirectToDashboard = () => {
    if (role === "user") {
      return <Navigate to="/user" />;
    } else if (role === "vendor") {
      return <Navigate to="/vendor" />;
    } else if (role === "admin") {
      return <Navigate to="/admin" />;
    }
    return null;
  };

  return (
    <div>
      {/* Display Header only when the current path is not in the noHeaderRoutes */}
      {!noHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        {/* Redirect authenticated user to their dashboard if visiting login/signup */}
        <Route
          path="/login"
          element={role ? redirectToDashboard() : <Login />}
        />
        <Route
          path="/register"
          element={role ? redirectToDashboard() : <Signup />}
        />

        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/vendor" element={<VendorMain />} /> */}
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/user" element={<UserMain />} />

        {/* User-Specific Routes */}
        {role === "user" && (
          <>
            <Route path="/user" element={<UserMain />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/guest-list" element={<GuestList />} />
            <Route path="/user/vendor" element={<Vendor />} />
            <Route path="/user/add-event" element={<AddEvent />} />
          </>
        )}

        {/* Vendor-Specific Routes */}
        {role === "vendor" && (
          <>
          {/* {console.log("hi",email)} */}
            <Route path="/vendor/vendor-list" element={<VendorList />} />
            <Route path="/vendor/your-item" element={<YourItem />} />
            <Route path="/vendor/add-new-item" element={<AddNewItem />} />
            <Route path="/vendor/transaction" element={<Transaction />} />
            <Route path="/vendor/order-status" element={<OrderStatus />} />
            <Route path="/vendor" element={<VendorDashboard email={email} />} />
          </>
        )}

        {/* Admin-Specific Routes */}
        {role === "admin" && (
          <>
            {/*<Route path="/admin" element={<AdminDashboard />} />*/}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </>
        )}

        {/* Redirect to Login if Unauthorized */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
