import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserMain() {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/getAllEvent`);
        const data = Array.isArray(response.data) ? response.data : [];
        console.log(data);
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
        {isLoading ? (
          <p className="text-white text-xl font-semibold">Loading events...</p>
        ) : eventsData.length === 0 ? (
          <p className="text-white text-xl font-semibold">No events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventsData.map((event) => {
              // Ensure event and its data property exist
              if (!event || !event.data) {
                console.warn("Invalid event data:", event);
                return null;
              }

              const { name, date, totalAmount, vendors } = event.data;

              return (
                <div
                  key={event.id || event._id}
                  className="bg-white rounded-lg shadow-lg p-8 border border-gray-300 hover:shadow-2xl transition"
                >
                  {/* Event Details */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{name || "Unnamed Event"}</h2>
                  <p className="text-gray-600 text-lg mb-4">Date: {date || "N/A"}</p>
                  <p className="text-gray-600 text-lg mb-4">
                    Total Amount: {totalAmount ? `${totalAmount} ₹` : "N/A"}
                  </p>

                  {/* Vendors Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Vendors:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {(vendors || []).map((vendor, index) => (
                        <li key={index} className="text-gray-800">
                          <p>
                            <strong>Name:</strong> {vendor?.name || "N/A"}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            <a
                              href={`mailto:${vendor?.email || ""}`}
                              className="text-blue-600 hover:underline"
                            >
                              {vendor?.email || "N/A"}
                            </a>
                          </p>
                          <p>
                            <strong>Price:</strong> {vendor?.price ? `${vendor.price} ₹` : "N/A"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMain;
