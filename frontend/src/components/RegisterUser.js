import React, { useState } from 'react';

function RegisterVendor() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('vendor');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [products, setProducts] = useState([{ productName: '', productPrice: '', productImage: '' }]); // Added 'productImage'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
    console.log({ name, role, password, email, number, products });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { productName: '', productPrice: '', productImage: '' }]); // Include productImage
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Register Vendor</h1>
      <form onSubmit={handleSubmit}>
        {/* Vendor Details */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label htmlFor="number">Number:</label>
          <input
            type="tel"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your contact number"
            required
          />
        </div>

        {/* Dynamic Product List */}
        <div>
          <h3>Products</h3>
          {products.map((product, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label>Product Price:</label>
                <input
                  type="number"
                  value={product.productPrice}
                  onChange={(e) => handleProductChange(index, 'productPrice', e.target.value)}
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div>
                <label>Product Image Link:</label>
                <input
                  type="text"
                  value={product.productImage}
                  onChange={(e) => handleProductChange(index, 'productImage', e.target.value)}
                  placeholder="Enter product image link"
                  required
                />
              </div>
              <button type="button" onClick={() => removeProduct(index)}>
                Remove Product
              </button>
            </div>
          ))}
          <button type="button" onClick={addProduct}>
            Add Product
          </button>
        </div>

        <button type="submit">Register Vendor</button>
      </form>
    </div>
  );
}

export default RegisterVendor;
