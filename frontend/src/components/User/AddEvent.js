import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [popupVendorItems, setPopupVendorItems] = useState(null);

  const baseUrl = process.env.REACT_APP_BASE_URL; // Replace with your actual base URL

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
    const vendorPrice = Array.isArray(vendor.data.items) && vendor.data.items.length > 0
      ? vendor.data.items.reduce((total, item) => total + Number(item.itemPrice), 0)
      : 0;

    // Add full vendor details to selected vendors
    setSelectedVendors((prevSelectedVendors) => [
      ...prevSelectedVendors,
      {
        name: vendor.data.name,
        email: vendor.data.email,
        price: vendorPrice,
      },
    ]);
  };

  const calculateTotalAmount = () => {
    // Calculate total amount from the selected vendors
    return selectedVendors.reduce((total, vendor) => total + vendor.price, 0);
  };

  const handleShowItems = (vendor) => {
    // Ensure items are initialized as an empty array if undefined
    const vendorWithItems = { ...vendor, items: vendor.data.items || [] };

    // Calculate the total price of items for this vendor
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
      vendors: selectedVendors, // Include all vendor details
      totalAmount: calculateTotalAmount(),
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
        }}
      >
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">Add Event</h1>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Event Name:</label>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Event Date:</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Total Amount: {calculateTotalAmount()} ₹
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  See Items
                </button>
                <button
                  onClick={() => handleSelectVendor(vendor)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Select Vendor
                </button>
              </div>
            </div>
          ))}
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
