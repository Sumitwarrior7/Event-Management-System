import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Home</h1>
      <Link 
        to="/login" 
        className="text-lg text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Login
      </Link>
      <ul className="mt-8 space-y-4">
        <li>
          <Link 
            to="/vendor/dashboard" 
            className="text-lg text-blue-500 hover:underline"
          >
            Vendor Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/dashboard" 
            className="text-lg text-blue-500 hover:underline"
          >
            Admin Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/user" 
            className="text-lg text-blue-500 hover:underline"
          >
            User Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
