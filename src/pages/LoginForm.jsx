import { useState } from "react";
import { loginUser } from "../Service/api/api";

export default function LoginForm({ goRegister, goForgot, goUserShow }) {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      alert(response.message);
      localStorage.setItem("token", response.token);
      goUserShow();
    } catch (error) {
      console.log(error);
      alert("Login Failed. Try again");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <input
        name="userName"
        placeholder="Username"
        value={loginData.userName}
        onChange={handleChange}
        className="w-full border p-3 mb-4 rounded-lg"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <p
        onClick={goForgot}
        className="text-sm text-blue-500 cursor-pointer mt-2"
      >
        Forgot Password?
      </p>

      <button
        type="submit"
        className="w-full bg-cyan-400 py-3 rounded-lg mt-5 font-bold"
      >
        Login
      </button>

      <p className="text-center mt-4">
        Create an account?{" "}
        <span
          onClick={goRegister}
          className="text-blue-600 cursor-pointer font-semibold"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
}
