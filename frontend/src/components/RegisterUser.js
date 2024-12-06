
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function RegisterUser() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission or validation can be added here
    console.log({ name,email,password });
  };

  return (
    <div>
      <h1>RegisterUser</h1>
      <form onSubmit={handleSubmit}>
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
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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

        <button type="submit">RegisterUser</button>
      </form>
    </div>
  );
}

export default RegisterUser;
