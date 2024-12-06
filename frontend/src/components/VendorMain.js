import { React, useContext, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import YourItem from "./Vendor/youritem";
import AddNewItem from "./Vendor/AddNewItem";
import Transaction from "./Vendor/Transaction";
import { GlobalContext } from "../globalContext";

function VendorMain() {
  const useAuth = useContext(GlobalContext);

  return (
    <div>
      <h1>Vendor Main Page</h1>
      <nav>{useAuth.globalState.name}</nav>
      <nav>{useAuth.globalState.email}</nav>
      <nav>{useAuth.globalState.role}</nav>
    </div>
  );
}

export default VendorMain;
