import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {GlobalContext} from "../../globalContext"
// import { glob } from "fs";
const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [popupVendorItems, setPopupVendorItems] = useState(null);
  
  const baseUrl = process.env.REACT_APP_BASE_URL; // Replace with your actual base URL
  // const userEmail = ; // Replace with the actual user's email from your authentication system
  const { globalState } = useContext(GlobalContext); 
  const {email}=globalState;
  // Fetch vendors on component load
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/vender/getAllVender`);
        setVendors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        alert("Failed to load vendors.");
      }
    };
    fetchVendors();
  }, []);

  const handleSelectVendor = (vendor) => {
    const vendorPrice =
      Array.isArray(vendor.data.items) && vendor.data.items.length > 0
        ? vendor.data.items.reduce((total, item) => total + Number(item.itemPrice), 0)
        : 0;

    // Check if vendor is already selected
    const isAlreadySelected = selectedVendors.some(
      (selectedVendor) => selectedVendor.email === vendor.data.email
    );

    if (isAlreadySelected) {
      alert("Vendor is already selected!");
      return;
    }

    setSelectedVendors((prevSelectedVendors) => [
      ...prevSelectedVendors,
      {
        name: vendor.data.name,
        email: vendor.data.email,
        price: vendorPrice,
      },
    ]);
  };

  const handleUnselectVendor = (vendorEmail) => {
    setSelectedVendors((prevSelectedVendors) =>
      prevSelectedVendors.filter((vendor) => vendor.email !== vendorEmail)
    );
  };

  const calculateTotalAmount = () => {
    return selectedVendors.reduce((total, vendor) => total + vendor.price, 0);
  };

  const handleShowItems = (vendor) => {
    const vendorWithItems = { ...vendor, items: vendor.data.items || [] };
    const itemTotal = vendorWithItems.items.reduce((sum, item) => sum + Number(item.itemPrice), 0);
    setPopupVendorItems({ ...vendorWithItems, itemTotal });
  };

  const closePopup = () => {
    setPopupVendorItems(null);
  };

  const handleSubmit = async () => {
    if (!eventName || !eventDate) {
      alert("Please fill out all fields.");
      return;
    }

    if (selectedVendors.length === 0) {
      alert("Please select at least one vendor.");
      return;
    }

    const event = {
      name: eventName,
      date: eventDate,
      vendors: selectedVendors,
      totalAmount: calculateTotalAmount(),
      createdBy: email, // Add user email who is creating the event
    };

    try {
      const response = await axios.post(`${baseUrl}/event/createEvent`, event);
      alert("Event successfully created!");
      console.log("Event Created:", response.data);

      // Reset form
      setEventName("");
      setEventDate("");
      setSelectedVendors([]);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create the event.");
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-gray-100 p-6"
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/986/210/423/party-light-event-people-wallpaper-preview.jpg')",
          backgroundRepeat: "no-repeat", // Ensures no repetition of the image
          backgroundSize: "cover", // Scales the image to cover the entire container
          backgroundPosition: "center", // Centers the image
        }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">Add Event</h1>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Event Name:</label>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Event Date:</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Total Amount: {calculateTotalAmount()} ₹
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => {
            const isSelected = selectedVendors.some(
              (selectedVendor) => selectedVendor.email === vendor.data.email
            );

            return (
              <div
                key={vendor.data.email}
                className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{vendor.data.name}</h3>
                <p className="text-gray-600 mb-4">
                  Price:{" "}
                  {Array.isArray(vendor.data.items) && vendor.data.items.length > 0
                    ? vendor.data.items.reduce((total, item) => total + Number(item.itemPrice), 0)
                    : 0}{" "}
                  ₹
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShowItems(vendor)}
                    className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-700"
                  >
                    See Items
                  </button>
                  {isSelected ? (
                    <button
                      onClick={() => handleUnselectVendor(vendor.data.email)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Unselect Vendor
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectVendor(vendor)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Select Vendor
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {popupVendorItems && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Items from {popupVendorItems.data.name}
              </h2>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closePopup}
              >
                ✖
              </button>
              <ul className="space-y-4">
                {popupVendorItems.items.length === 0 ? (
                  <li className="text-gray-600 font-medium">No items added yet</li>
                ) : (
                  popupVendorItems.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.itemName}
                        className="w-12 h-12 rounded-full border border-gray-300"
                      />
                      <div>
                        <span className="text-gray-800 font-medium">{item.itemName}</span>
                        <span className="text-gray-600 block">Price: {item.itemPrice} ₹</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <p className="text-gray-800 font-semibold mt-4">
                Total Item Price: {popupVendorItems.itemTotal} ₹
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="bg-sky-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-800"
          >
            Create Event
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
