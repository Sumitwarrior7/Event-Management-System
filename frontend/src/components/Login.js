import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../globalContext";

// Import baseUrl from .env file
const baseUrl = (process.env.REACT_APP_BASE_URL).replace(/^"|"$/g, "");
console.log("hi",baseUrl);
const Login = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(globalState.role || "user");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine the endpoint based on the role
      let endpoint = "";
      if (role === "user") {
        endpoint = `${baseUrl}/user/login`;
        console.log("swayam",endpoint);
      } else if (role === "admin") {
        endpoint = `${baseUrl}/admin/login`;
      } else if (role === "vendor") {
        endpoint = `${baseUrl}/vender/login`;
      }
      console.log("here it is", role);


      // Make a POST request to the backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update global state with login details
        setGlobalState({
          ...globalState,
          email: data[0].data.email,
          role: data[0].data.role,
          name: data[0].data.name, // Assuming the backend returns the user's name
        });

        console.log("Global State Updated:", { email: data[0].data.email, role:data[0].data.role });
        // Redirect to appropriate dashboard
        console.log("role",role);
        if (role === "user") {
          navigate("/user");
        } else if (role === "admin") {
          window.location.href = "/admin/dashboard";

        } else if (role === "vendor") {
          navigate("/vendor/dashboard");
        }
      } else {
        // Handle errors (e.g., invalid credentials)
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center absolute inset-0 bg-black opacity-120" 
      style={{ backgroundImage: 'url(https://wallpapercave.com/dwp1x/wp10715825.jpg)' }}
    >
    <div 
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border-2"
    >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-gray-700">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
