import React from "react";

const VendorCard = ({ vendor, onShop }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-lg font-bold">{vendor.name}</h2>
      <p className="text-gray-600">Contact: {vendor.contact}</p>
      <button
        onClick={onShop}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Shop Items
      </button>
    </div>
  );
};

export default VendorCard;
