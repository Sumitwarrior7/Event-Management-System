import React, { useState } from "react";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("home");

  // Sample data for vendors and users
  const [vendors, setVendors] = useState([
    { id: 1, name: "Vendor A", contact: "123-456-7890", approved: false },
    { id: 2, name: "Vendor B", contact: "987-654-3210", approved: false },
    { id: 3, name: "Vendor C", contact: "555-555-5555", approved: false },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "User A", email: "usera@example.com" },
    { id: 2, name: "User B", email: "userb@example.com" },
    { id: 3, name: "User C", email: "userc@example.com" },
  ]);

  // Handlers for removing and approving vendors
  const handleRemoveVendor = (id) => {
    setVendors((prev) => prev.filter((vendor) => vendor.id !== id));
  };

  const handleApproveVendor = (id) => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === id ? { ...vendor, approved: true } : vendor
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button
          onClick={() => alert("Logged out!")}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentSection("home")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "home" ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection("vendors")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "vendors"
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                Maintain Vendor
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection("users")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "users"
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                Maintain User
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection("approvedVendors")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "approvedVendors"
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                Approved Vendors
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          {currentSection === "home" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
              <p className="text-gray-700">
                Use the sidebar to navigate and manage vendors or users.
              </p>
            </div>
          )}

          {currentSection === "vendors" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Vendor Management</h2>
              {vendors.length === 0 ? (
                <p className="text-gray-500">No vendors available.</p>
              ) : (
                <table className="min-w-full bg-white border rounded shadow">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-left px-4 py-2">Contact</th>
                      <th className="text-center px-4 py-2">Status</th>
                      <th className="text-center px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b">
                        <td className="px-4 py-2">{vendor.name}</td>
                        <td className="px-4 py-2">{vendor.contact}</td>
                        <td className="px-4 py-2 text-center">
                          {vendor.approved ? "Approved" : "Pending"}
                        </td>
                        <td className="px-4 py-2 text-center space-x-2">
                          {!vendor.approved && (
                            <button
                              onClick={() => handleApproveVendor(vendor.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveVendor(vendor.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {currentSection === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">User Management</h2>
              {users.length === 0 ? (
                <p className="text-gray-500">No users available.</p>
              ) : (
                <table className="min-w-full bg-white border rounded shadow">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-left px-4 py-2">Email</th>
                      <th className="text-center px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => setUsers((prev) =>
                              prev.filter((u) => u.id !== user.id)
                            )}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {currentSection === "approvedVendors" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Approved Vendors</h2>
              {vendors.filter((vendor) => vendor.approved).length === 0 ? (
                <p className="text-gray-500">No approved vendors yet.</p>
              ) : (
                <ul className="list-disc list-inside">
                  {vendors
                    .filter((vendor) => vendor.approved)
                    .map((vendor) => (
                      <li key={vendor.id}>
                        {vendor.name} - {vendor.contact}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
