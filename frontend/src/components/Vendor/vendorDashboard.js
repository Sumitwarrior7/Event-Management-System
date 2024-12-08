import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed

const VendorDashboard = ({ email }) => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/vender/getVender`, { email });
        setVendor(response.data);
        setProducts(response.data[0].data.items || []);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    if (email) {
      fetchVendor();
    }
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const newProductItem = { ...newProduct, id: Date.now() };
      setProducts((prev) => [...prev, newProductItem]);
      setNewProduct({ name: "", price: "", image: null });
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleAddNewItemRedirect = () => {
    navigate("/vendor/add-new-item");
  };

  const handleUpdateProduct = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id ? { ...newProduct, id: product.id } : product
      )
    );
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", image: null });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url('/images/bg2.png')` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <button
          onClick={handleAddNewItemRedirect}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg mb-6 transition duration-300 flex items-center justify-center mx-auto"
        >
          Add New Product
        </button>
        <h2 className="text-2xl font-bold pt-16 mb-4text-2xl font-bold mb-4 text-gray-800 text-center text-gray-800">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-bold bg-sky-700 text-white p-3 rounded-lg">
          <span>Product Image</span>
          <span>Product Name</span>
          <span>Product Price</span>
          <span>Action</span>
        </div>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center text-center border-t py-4"
            >
              <div className="w-20 h-20 bg-gray-200 mx-auto flex items-center justify-center rounded overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <span>{product.itemName}</span>
              <span>Rs. {product.itemPrice}</span>
              <div className="flex space-x-2 justify-center">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-lg"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No items added yet.</p>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
