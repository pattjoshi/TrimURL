import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 bg-white shadow-md fixed top-0 z-50 sticky">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://miro.medium.com/v2/resize:fit:830/1*Pdw7h5X6vQQNVopIzHBG6A.jpeg"
          alt="logo"
          className="w-[80px] h-[100px] object-contain"
        />
      </div>

      <div className="flex items-center">
        {userData ? (
          <div className="relative group">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer text-lg font-bold">
              {userData?.name[0].toUpperCase()}
            </div>

            <ul className="list-none group-hover:opacity-100 transition-opacity duration-200 z-10">
              {!userData?.isVerified ? (
                <button onClick={sendVerificationOtp}>
                  {" "}
                  please Verify email
                </button>
              ) : (
                <button onClick={logOut}>Logout</button>
              )}
            </ul>
          </div>
        ) : (
          <button
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
            onClick={() => navigate("/login")} // it uses an arrow function. The reason for this is to delay the execution of the navigate() function until the click actually happens.
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
