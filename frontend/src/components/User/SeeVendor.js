import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VendorDetails = () => {
  const { vendor_id } = useParams();
  const [vendorData, setVendorData] = useState(null);

  useEffect(() => {
    // Replace this with your API call or data fetching logic
    const fetchVendorData = async () => {
      try {
        const response = await fetch(`/api/vendors/${vendor_id}`);
        if (!response.ok) throw new Error("Failed to fetch vendor data");
        const data = await response.json();
        setVendorData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVendorData();
  }, [vendor_id]);

  // if (!vendorData) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-100">
  //       <div className="text-lg font-semibold text-gray-700">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6">
          <h1 className="text-3xl font-bold tracking-wide">Vendor Details</h1>
        </div>
  
        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Name:</h2>
            <p className="text-gray-700 sm:ml-6">Bruce Wayne</p>
          </div>
  
          {/* Email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Email:</h2>
            <p className="text-gray-700 sm:ml-6">bruce@batman.com</p>
          </div>
  
          {/* Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Phone:</h2>
            <p className="text-gray-700 sm:ml-6">9211</p>
          </div>
  
          {/* Address */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Address:</h2>
            <p className="text-gray-700 sm:ml-6">Gotham</p>
          </div>
  
          {/* Description */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Description:</h2>
            <p className="text-gray-700 sm:ml-6">
              It's not who I am underneath, but what I do that defines me.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default VendorDetails;
