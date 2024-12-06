import React, { useState } from "react";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [popupVendorItems, setPopupVendorItems] = useState(null);

  const vendors = [
    {
      id: 1,
      name: "Vendor A",
      price: 500,
      items: [
        { name: "Item 1", image: "https://via.placeholder.com/50" },
        { name: "Item 2", image: "https://via.placeholder.com/50" },
      ],
    },
    {
      id: 2,
      name: "Vendor B",
      price: 700,
      items: [
        { name: "Item 3", image: "https://via.placeholder.com/50" },
        { name: "Item 4", image: "https://via.placeholder.com/50" },
      ],
    },
  ];

  const handleSelectVendor = (vendorId) => {
    if (!selectedVendors.includes(vendorId)) {
      setSelectedVendors([...selectedVendors, vendorId]);
    }
  };

  const calculateTotalAmount = () => {
    return selectedVendors.reduce((total, vendorId) => {
      const vendor = vendors.find((v) => v.id === vendorId);
      if (vendor) {
        return total + vendor.price;
      }
      return total;
    }, 0);
  };

  const handleShowItems = (vendor) => {
    setPopupVendorItems(vendor);
  };

  const closePopup = () => {
    setPopupVendorItems(null);
  };

  const handleSubmit = () => {
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
    };

    console.log("Event Created:", event);
    alert("Event successfully created!");

    // Reset form
    setEventName("");
    setEventDate("");
    setSelectedVendors([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">Add Event</h1>

      {/* Form Section */}
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Total Amount: {calculateTotalAmount()} ₹</h2>
      </div>

      {/* Vendor Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{vendor.name}</h3>
            <p className="text-gray-600 mb-4">Price: {vendor.price} ₹</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleShowItems(vendor)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                See Items
              </button>
              <button
                onClick={() => handleSelectVendor(vendor.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Select Vendor
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Section */}
      {popupVendorItems && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Items from {popupVendorItems.name}
            </h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              ✖
            </button>
            <ul className="space-y-4">
              {popupVendorItems.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default AddEvent;