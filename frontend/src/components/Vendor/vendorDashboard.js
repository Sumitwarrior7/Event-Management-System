import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed

const VendorDashboard = ({email}) => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate(); 
  // Fetch vendor data when the component mounts
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/vender/getVender`, { email });
        setVendor(response.data); // Set the vendor object
        console.log("free",response.data[0].data.items);
        setProducts(response.data[0].data.items || []); // Update products with vendor items
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    if (email) {
      console.log("high hiils up")
      fetchVendor();
    }else{
      console.log("low hiils up")

    }
  }, [email]);

  // Handle input changes for the add/edit product form
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Add new product logic
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const newProductItem = { ...newProduct, id: Date.now() };
      setProducts((prev) => [...prev, newProductItem]);
      setNewProduct({ name: "", price: "", image: null });
    } else {
      alert("Please fill out all fields!");
    }
  };

  // Delete product logic
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Edit product logic
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
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Content Section */}
      <div className="mt-6 p-4 bg-white rounded shadow">
        {/* Add/Edit Product Form */}
        {/* add a button here which will redirect to vendor/add-new-item*/}
        <button
          onClick={handleAddNewItemRedirect}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mb-4"
        >
          Add New Product
        </button>
        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-bold bg-blue-600 text-white p-2 rounded">
          <span>Product Image</span>
          <span>Product Name</span>
          <span>Product Price</span>
          <span>Action</span>
        </div>
        {console.log(products)}
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center text-center border-t py-4"
            >
              <div className="w-20 h-20 bg-gray-300 mx-auto flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </div>
              <span>{product.itemName}</span>
              <span>Rs. {product.itemPrice}</span>
              <div className="flex space-x-2 justify-center">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
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
