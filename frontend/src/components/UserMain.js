import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Example data for events
const eventsData = [
  {
    id: 1,
    name: "Tech Conference 2024",
    date: "12-12-2024",
    vendors: [
      { name: "Vendor 1", link: "/vendor1" },
      { name: "Vendor 2", link: "/vendor2" }
    ]
  },
  {
    id: 2,
    name: "Art Exhibition",
    date: "15-12-2024",
    vendors: [
      { name: "Vendor 3", link: "/vendor3" },
      { name: "Vendor 4", link: "/vendor4" }
    ]
  },
  {
    id: 3,
    name: "Sports Fest",
    date: "21-12-2024",
    vendors: [
      { name: "Vendor 1", link: "/vendor1" },
      { name: "Vendor 4", link: "/vendor4" }
    ]
  },
  {
    id: 4,
    name: "Shaadi",
    date: "24-12-2024",
    vendors: [
      { name: "Vendor 1", link: "/vendor1" },
      { name: "Vendor 3", link: "/vendor3" }
    ]
  }
];

function UserMain() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">User Events</h1>

      <div className="text-center mb-6">
        <Link
          to="/vendor/add-event"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Add an Event
        </Link>
      </div>

      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-4">Date: {event.date}</p>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Vendors:</h3>
              <ul className="list-disc list-inside space-y-1">
                {event.vendors.map((vendor, index) => (
                  <li key={index}>
                    <Link
                      to={vendor.link}
                      className="text-blue-500 hover:underline"
                    >
                      {vendor.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserMain;