import React from "react";

const VendorItems = ({ vendor, onBack }) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Back to Vendors
      </button>
      <h2 className="text-2xl font-bold mb-4">
        Items from {vendor.name}
      </h2>
      <ul className="list-disc list-inside">
        {vendor.items.map((item, index) => (
          <li key={index} className="text-gray-800">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorItems;
