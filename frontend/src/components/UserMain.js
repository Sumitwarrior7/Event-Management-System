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
  },
  {
    id: 5,
    name: "Music Show",
    date: "24612-2024",
    vendors: [
      { name: "Vendor 7", link: "/vendor7" },
      { name: "Vendor 3", link: "/vendor3" }
    ]
  },
];

function UserMain() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-70"
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/986/210/423/party-light-event-people-wallpaper-preview.jpg')",
        }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 w-full text-center p-6">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-white text-center mb-10">User Events</h1>

        {/* Button Section */}
        <div className="text-center mb-8">
          <Link
            to="/user/add-event"
            className="inline-block bg-blue-700 text-white px-8 py-4 text-lg rounded-lg font-semibold hover:bg-blue-800 transition shadow-md"
          >
            Add an Event
          </Link>
        </div>

        {/* Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-300 hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{event.name}</h2>
              <p className="text-gray-600 text-lg mb-4">Date: {event.date}</p>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Vendors:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {event.vendors.map((vendor, index) => (
                    <li key={index}>
                      <Link
                        to="./see-vendor/1"
                        className="text-blue-600 hover:underline font-medium"
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
    </div>
  );
}

export default UserMain;
