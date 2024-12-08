// Necessary Imports
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../globalContext";

function UserMain() {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { globalState } = useContext(GlobalContext);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [isVendorPopupOpen, setIsVendorPopupOpen] = useState(false);

  const baseUrl = (process.env.REACT_APP_BASE_URL || "").replace(/^"|"$/g, "");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userEmail = globalState.email;
        const response = await axios.post(`${baseUrl}/event/getEvent`, {
          email: userEmail,
        });
        const data = Array.isArray(response.data.list) ? response.data.list : [];
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [globalState.email, baseUrl]);

  const openVendorPopup = (vendors) => {
    setSelectedVendors(vendors);
    setIsVendorPopupOpen(true);
  };

  const closeVendorPopup = () => {
    setIsVendorPopupOpen(false);
  };

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
            className="inline-block bg-sky-700 text-white px-8 py-4 text-lg rounded-lg font-semibold hover:bg-sky-700 transition shadow-md"
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
              if (!event || !event.data) {
                console.warn("Invalid event data:", event);
                return null;
              }

              const { name, date, totalAmount, vendors } = event.data;

              return (
                <div
                  key={event.id || event._id}
                  className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:shadow-2xl transition relative overflow-hidden"
                >
                  {/* Event Details */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{name || "Unnamed Event"}</h2>
                  <p className="text-gray-600 text-lg mb-4">Date: {date || "N/A"}</p>
                  <p className="text-gray-600 text-lg mb-4">
                    Total Amount: {totalAmount ? `${totalAmount} ₹` : "N/A"}
                  </p>

                  {/* Vendors Button */}
                  <button
                    onClick={() => openVendorPopup(vendors)}
                    className="bg-sky-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-700 transition w-full"
                  >
                    See Vendors
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Vendor Popup */}
      {isVendorPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-1/3 max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Vendors</h2>

            {selectedVendors.length === 0 ? (
              <p className="text-gray-600">No vendors available for this event.</p>
            ) : (
              <ul className="space-y-4">
                {selectedVendors.map((vendor, index) => (
                  <li key={index} className="border-b pb-4">
                    <p className="text-lg font-medium text-gray-700">
                      <strong>Name:</strong> {vendor?.name || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${vendor?.email || ""}`}
                        className="text-sky-700 hover:underline"
                      >
                        {vendor?.email || "N/A"}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <strong>Price:</strong> {vendor?.price ? `${vendor.price} ₹` : "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={closeVendorPopup}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMain;
