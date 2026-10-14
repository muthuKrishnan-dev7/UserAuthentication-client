import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validateRegisterForm } from "../Service/validation/validateRegisterForm";
import { registerUser } from "../Service/api/api";

export default function RegisterForm({ goOtp, goLogin }) {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ===== Sign Up Onclick =====
  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(registerData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    const { confirmPassword, ...userData } = registerData;
    try {
      setLoading(true);
      const response = await registerUser(userData);
      console.log("Registration successful:", response);
      localStorage.setItem("email", response.email);
      goOtp(response.email);
    } catch (error) {
      console.error(error);
      setErrors({
        email: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border p-3 mb-3 rounded-lg outline-none transition-all ${
      errors[field]
        ? "border-red-500 pr-10 focus:ring-2 focus:ring-red-300"
        : "border-gray-300 focus:ring-2 focus:ring-cyan-300"
    }`;

  return (
    <form onSubmit={handleSignup}>
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>

      {/* First + Last Name */}
      <div className="flex gap-2">
        <input
          name="firstname"
          placeholder="First Name"
          value={registerData.firstname}
          onChange={handleChange}
          className={inputClass("firstname")}
        />

        <input
          name="lastname"
          placeholder="Last Name"
          value={registerData.lastname}
          onChange={handleChange}
          className={inputClass("lastname")}
        />
      </div>

      {/* Email */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={registerData.email}
        onChange={handleChange}
        className={inputClass("email")}
      />

      {/* Phone */}
      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        value={registerData.phone}
        onChange={handleChange}
        className={inputClass("phone")}
      />

      {/* Password */}
      <div className="relative">
        <input
          name="password"
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={registerData.password}
          onChange={handleChange}
          className={inputClass("password")}
        />

        <button
          type="button"
          onClick={() => setShowPass((prev) => !prev)}
          className="absolute right-3 top-3.5"
        >
          {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          name="confirmPassword"
          type={showConfirmPass ? "text" : "password"}
          placeholder="Confirm Password"
          value={registerData.confirmPassword}
          onChange={handleChange}
          className={inputClass("confirmPassword")}
        />

        <button
          type="button"
          onClick={() => setShowConfirmPass((prev) => !prev)}
          className="absolute right-3 top-3.5"
        >
          {showConfirmPass ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>

      {/* Sign Up */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-400 hover:bg-cyan-500 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      {/* Login */}
      <p className="text-center mt-4 text-sm">
        Already have account?{" "}
        <button
          type="button"
          onClick={goLogin}
          className="text-blue-600 cursor-pointer font-medium"
        >
          Login
        </button>
      </p>
    </form>
  );
}
