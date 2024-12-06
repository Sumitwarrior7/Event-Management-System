import React, { useState } from "react";
import VendorCard from "./vendorCard";
import VendorItems from "./vendorItems";

const VendorList = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Sample array of vendors
  const vendors = [
    {
      id: 1,
      name: "Vendor A",
      contact: "123-456-7890",
      items: ["Item 1", "Item 2", "Item 3"],
    },
    {
      id: 2,
      name: "Vendor B",
      contact: "987-654-3210",
      items: ["Item A", "Item B", "Item C"],
    },
    {
      id: 3,
      name: "Vendor C",
      contact: "555-555-5555",
      items: ["Product X", "Product Y", "Product Z"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Show Vendor Items if a vendor is selected */}
      {selectedVendor ? (
        <VendorItems
          vendor={selectedVendor}
          onBack={() => setSelectedVendor(null)}
        />
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Vendors</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Map over vendors and render VendorCard */}
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onShop={() => setSelectedVendor(vendor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorList;
