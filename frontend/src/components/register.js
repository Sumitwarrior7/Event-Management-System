import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../globalContext";
// Import baseUrl from .env file
const baseUrl = process.env.REACT_APP_BASE_URL;

const Signup = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [formState, setFormState] = useState({
    name: globalState.name || "",
    email: globalState.email || "",
    password: "",
    role: globalState.role || "user",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine the endpoint based on the role
      let endpoint = "";
      if (formState.role === "user") {
        endpoint = `${baseUrl}/user/createUser`;
      } else if (formState.role === "admin") {
        endpoint = `${baseUrl}/admin/createAdmin`;
      } else if (formState.role === "vendor") {
        endpoint = `${baseUrl}/vender/createVender`;
      }

      // Make a POST request to the backend for registration
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
          role: formState.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update global state with registration details
        setGlobalState({
          ...formState,
        });

        console.log("Registered User:", formState);
        alert("Registration Successful!");
        navigate("/login"); // Redirect to login after successful registration
      } else {
        // Handle registration errors
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center absolute inset-0 bg-black opacity-120" 
      style={{ backgroundImage: 'url(https://wallpapercave.com/dwp1x/wp10715825.jpg)' }}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-gray-700">
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={formState.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Login 
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
