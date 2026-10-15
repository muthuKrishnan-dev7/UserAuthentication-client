import { useState } from "react";
import { resetPassword } from "../Service/api/api";

export default function ForgotPassword2({ goLogin }) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    const email = localStorage.getItem("email");

    try {
      const response = await resetPassword({
        email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      console.log("Password reset done:", response);
      localStorage.removeItem("email");
      alert("Password changed successfully. Please login.");
      goLogin();
    } catch (err) {
      console.log(err);
      setError("Password reset failed. Try again");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-4"
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg mb-4"
        required
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-cyan-400 py-3 rounded-lg font-bold"
      >
        Reset Password
      </button>
    </form>
  );
}
