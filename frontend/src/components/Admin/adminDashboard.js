import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorsAndUsers = async () => {
      try {
        const vendorResponse = await axios.get(`${baseUrl}/vender/getAllVender`);
        setVendors(vendorResponse.data);

        const userResponse = await axios.get(`${baseUrl}/user/getAllUser`);
        setUsers(userResponse.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorsAndUsers();
  }, []);

  const handleDeleteVendor = async (email) => {
    try {
      setVendors((prev) => prev.filter((vendor) => vendor.data.email !== email));
      await axios.delete(`${baseUrl}/vender/deleteVender`, {
        params: { email },
      });
    } catch (err) {
      setError("Failed to delete vendor");
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      setUsers((prev) => prev.filter((user) => user.data.email !== email));
      await axios.delete(`${baseUrl}/user/deleteUser`, {
        params: { email },
      });
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="w-11/12 mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-center text-4xl font-bold text-sky-700 mb-6">
          Vendor Management
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Vendors
            </h2>
            <table className="min-w-full bg-white border rounded shadow mb-8">
              <thead className="bg-sky-700 text-white">
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

            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Users
            </h2>
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-sky-700 text-white">
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
  );
};

export default AdminDashboard;
