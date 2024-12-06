import React, { useState } from "react";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [editingProduct, setEditingProduct] = useState(null);

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
      setProducts((prev) => [
        ...prev,
        { ...newProduct, id: Date.now() },
      ]);
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
      {/* Header Section */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Welcome 'Vendor Name'</h1>
        <div className="flex space-x-4">
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Product Status</button>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Request Item</button>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">View Product</button>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Log Out</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6 p-4 bg-white rounded shadow">
        {/* Add/Edit Product Form */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
            className={`mt-4 ${
              editingProduct ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded`}
          >
            {editingProduct ? "Update Product" : "Add The Product"}
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-bold bg-blue-600 text-white p-2 rounded">
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
              <div className="w-20 h-20 bg-gray-300 mx-auto flex items-center justify-center">
                {product.image ? (
                  <img
                    src={URL.createObjectURL(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </div>
              <span>{product.name}</span>
              <span>Rs. {product.price}</span>
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
          <p className="text-center text-gray-500 mt-4">No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
