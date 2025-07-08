import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSend] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOptSubmited, setIsOptSubmited] = useState(false);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const inputRef = useRef([]);
  const { backendUrl } = useContext(AppContext);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pastArray = paste.split("");
    pastArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const emailSubmitHandler = async (e) => {
    axios.defaults.withCredentials = true;

    try {
      e.preventDefault();
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-opt",
        { email }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEmailSend(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // OTP Submit Handler
  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    const arrayOtp = inputRef.current.map((e) => e.value);
    setOtp(arrayOtp.join(""));
    // Optionally, you can verify OTP here or just move to password form
    setIsOptSubmited(true);
  };
  // Password Reset Handler
  const passwordResetHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {/* Step 1: Enter Email */}
      {!isEmailSent && (
        <form onSubmit={emailSubmitHandler}>
          <h1>Reset password</h1>
          <p>Enter your register email address</p>
          <input
            value={email}
            type="email"
            placeholder="Email Id"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button>submit</button>
        </form>
      )}

      {/* Enter OTP */}
      {isEmailSent && !isOptSubmited && (
        <form onSubmit={otpSubmitHandler}>
          <h1>Reset password otp</h1>
          <p>Enter otp below</p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 text-center"
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-2">Submit</button>
        </form>
      )}
      {/* Enter your new password */}
      {isOptSubmited && (
        <form onSubmit={passwordResetHandler}>
          <h1>Reset password</h1>
          <p>Enter your register email address</p>
          <input
            value={newPassword}
            type="password"
            placeholder="password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button>submit</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
