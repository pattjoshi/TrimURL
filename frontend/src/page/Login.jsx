import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        // Fixed case sensitivity
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-pink-300 to-blue-200 relative">
      {/* Logo or icon placeholder */}
      <img
        src=""
        alt="Logo"
        className="absolute top-8 left-8 w-14 h-14 cursor-pointer bg-white/70 rounded-full shadow-md object-cover"
      />

      {/* Main card */}
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40">
        <h2 className="text-4xl font-extrabold text-red-500 mb-2 text-center drop-shadow">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          {state === "Sign Up"
            ? "Create your account to get started"
            : "Login to your account!"}
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/90 placeholder-gray-400 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/90 placeholder-gray-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/90 placeholder-gray-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p onClick={() => navigate("/reset-password")}>Forget Password</p>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-200"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-700 text-center">
          {state === "Sign Up" ? "Already have an account?" : "New user?"}{" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="underline cursor-pointer font-semibold text-red-500 hover:text-pink-500 transition"
          >
            {state === "Sign Up" ? "Login here" : "Sign up now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
