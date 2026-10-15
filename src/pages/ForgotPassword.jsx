import { useState } from "react";
import { emailCheck } from "../Service/api/api";

export default function ForgotPassword({ goNewPassword, goLogin }) {
  const [forgotData, setForgotData] = useState({
    userName: "",
  });

  const handleChange = (e) => {
    setForgotData({
      ...forgotData,
      userName: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault({ goLogin });
    try {
      const response = await emailCheck(forgotData);
      alert(response.email);
      localStorage.setItem("email", response.email);
      goNewPassword();
    } catch (error) {
      console.log(error);
      alert("Email not registered yet before. Please Register first.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Forgot Password</h2>

      <input
        placeholder="Enter Email"
        value={forgotData.userName}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-cyan-400 py-3 mt-4 rounded-lg font-bold"
      >
        Send Link
      </button>

      <p
        onClick={goLogin}
        className="text-center mt-4 text-blue-600 cursor-pointer"
      >
        Back to Login
      </p>
    </>
  );
}
