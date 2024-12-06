import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../globalContext'; // Import GlobalContext

// Replace with the actual backend URL
const baseUrl = process.env.REACT_APP_BASE_URL;

function AddNewItem() {
  // State for the form fields
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Access email from GlobalState using useContext
  const { globalState } = useContext(GlobalContext);
  const email = globalState.email; // Get email from global state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any field is empty
    if (!itemName || !itemPrice || !imageUrl) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newItem = { itemName, itemPrice, imageUrl };

    try {
      // Assuming you have an endpoint like "/vendor/addItem" for adding items
      const response = await fetch(`${baseUrl}/vender/addItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,  // Send the vendor email from global state
          item: newItem,  // Send the new item details
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccessMessage('Item added successfully!');
        setErrorMessage('');
        // Reset the form
        setItemName('');
        setItemPrice('');
        setImageUrl('');
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
    <div>
      <h2>Add New Item</h2>
      
      {/* Success or error messages */}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Item Name */}
        <div className="mb-4">
          <label htmlFor="itemName" className="block mb-2 text-gray-700">
            Item Name:
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Item Price */}
        <div className="mb-4">
          <label htmlFor="itemPrice" className="block mb-2 text-gray-700">
            Item Price:
          </label>
          <input
            type="number"
            id="itemPrice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Enter item price"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Item Image URL */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block mb-2 text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddNewItem;
