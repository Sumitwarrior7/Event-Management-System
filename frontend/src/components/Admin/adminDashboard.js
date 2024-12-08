import React, { useState, useEffect } from "react";
import axios from "axios"; // For making HTTP requests

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all vendors and users from the API when the component mounts
  useEffect(() => {
    const fetchVendorsAndUsers = async () => {
      try {
        const vendorResponse = await axios.get(`${baseUrl}/vender/getAllVender`);
        setVendors(vendorResponse.data); // Assuming the response is an array of vendors

        const userResponse = await axios.get(`${baseUrl}/user/getAllUser`);
        setUsers(userResponse.data); // Assuming the response is an array of users

        console.log(vendorResponse.data, userResponse.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorsAndUsers();
  }, []);

  // Handler for deleting a vendor
  const handleDeleteVendor = async (email) => {
    try {
      // Optimistic update: Immediately remove the vendor from the state
      setVendors((prev) => prev.filter((vendor) => vendor.data.email !== email));

      // Delete the vendor from the backend
      await axios.delete(`${baseUrl}/vender/deleteVender`, {
        params: { email },
      });
    } catch (err) {
      // Revert the optimistic update if the deletion fails
      setVendors((prev) => [...prev]); // Refresh the state from the previous state
      setError("Failed to delete vendor");
    }
  };

  // Handler for deleting a user
  const handleDeleteUser = async (email) => {
    try {
      // Optimistic update: Immediately remove the user from the state
      setUsers((prev) => prev.filter((user) => user.data.email !== email));

      // Delete the user from the backend
      await axios.delete(`${baseUrl}/user/deleteUser`, {
        params: { email },
      });
    } catch (err) {
      // Revert the optimistic update if the deletion fails
      setUsers((prev) => [...prev]); // Refresh the state from the previous state
      setError("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md p-4">
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                Maintain Vendor
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                Maintain User
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-4">Vendor Management</h2>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {/* Vendor Table */}
              <h3 className="text-xl font-semibold mb-4">Vendors</h3>
              <table className="min-w-full bg-white border rounded shadow mb-4">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-center px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b">
                      <td className="px-4 py-2">{vendor.data.name}</td>
                      <td className="px-4 py-2">{vendor.data.email}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDeleteVendor(vendor.data.email)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* User Table */}
              <h3 className="text-xl font-semibold mb-4">Users</h3>
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
                      <td className="px-4 py-2">{user.data.name}</td>
                      <td className="px-4 py-2">{user.data.email}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.data.email)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
