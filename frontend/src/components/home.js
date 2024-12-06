// https://wallpapercave.com/dwp1x/wp10715825.jpg

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center relative" 
      style={{ backgroundImage: 'url(https://wallpapercave.com/dwp1x/wp10715825.jpg)' }} // Replace with your image URL
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Semi-transparent overlay */}
      
      <div className="relative z-10 text-center text-white px-6 md:px-12 py-28">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
          Manage Your Events with Ease
        </h1>
        <p className="text-xl mb-10 max-w-4xl mx-auto">
          Whether you’re organizing a conference, wedding, or party, our platform helps you seamlessly manage all your events from start to finish.
        </p>
        <Link 
          to="/login" 
          className="text-lg text-white bg-indigo-700 px-8 py-4 rounded-xl shadow-2xl hover:bg-indigo-800 transition duration-300 transform hover:scale-105"
        >
          Login
        </Link>
        
        {/* Signup Link */}
        <p className="mt-8 text-xl">
          New here? <Link to="/signup" className="text-indigo-700 text-[#4169E1]-300 hover:underline text-2xl">Sign up</Link>
        </p>
      </div>

      {/* Features Section */}
      <div className="py-5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-semibold text-center text-white mb-12">Key Features of Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Feature 1 */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white mb-6">Event Planning</h3>
              <p className="text-white text-lg">
                Plan your events with ease using our intuitive tools. From guest lists to timelines, everything you need is in one place.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white mb-6">Real-Time Tracking</h3>
              <p className="text-white text-lg">
                Monitor the progress of your events with real-time updates, keeping you on track and ensuring everything runs smoothly.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white mb-6">Seamless Communication</h3>
              <p className="text-white text-lg">
                Stay connected with your team and clients through built-in messaging and notification systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
