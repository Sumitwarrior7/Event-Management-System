import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../globalContext'; // Import GlobalContext
import { useNavigate } from 'react-router-dom';

// Replace with the actual backend URL
const baseUrl = (process.env.REACT_APP_BASE_URL || "").replace(/^"|"$/g, "");

function AddNewItem() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { globalState } = useContext(GlobalContext);
  const email = globalState.email;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !itemPrice || !imageUrl) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newItem = { itemName, itemPrice, imageUrl };

    try {
      const response = await fetch(`${baseUrl}/vender/addItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          item: newItem,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Item added successfully!');
        setErrorMessage('');
        setItemName('');
        setItemPrice('');
        setImageUrl('');

        setTimeout(() => navigate('/vendor'), 2000); // Redirect to /vendor after success
      } else {
        setErrorMessage(data.message || 'Failed to add item. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url('/images/bg2.png')` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Item</h2>

        {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-gray-700 font-medium mb-2">
              Item Name:
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="itemPrice" className="block text-gray-700 font-medium mb-2">
              Item Price:
            </label>
            <input
              type="number"
              id="itemPrice"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              placeholder="Enter item price"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
              Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-700 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewItem;
