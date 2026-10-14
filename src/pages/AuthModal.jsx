import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword";
import OtpVerify from "./OtpVerify";
import UserShow from "./UserShow";
import loginlog from "../assets/loginlog.png";

export default function AuthModal() {
  const [activeForm, setActiveForm] = useState(() =>
    localStorage.getItem("token") ? "userShow" : "login",
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setActiveForm("login");
  };

  const renderActiveForm = () => {
    switch (activeForm) {
      case "login":
        return (
          <LoginForm
            goRegister={() => setActiveForm("register")}
            goForgot={() => setActiveForm("forgot")}
            goUserShow={() => setActiveForm("userShow")}
          />
        );

      case "register":
        return (
          <RegisterForm
            goLogin={() => setActiveForm("login")}
            goOtp={() => setActiveForm("otp")}
          />
        );

      case "forgot":
        return <ForgotPassword goLogin={() => setActiveForm("login")} />;

      case "otp":
        return (
          <OtpVerify
            goLogin={() => setActiveForm("login")}
            goUserShow={() => setActiveForm("userShow")}
          />
        );

      case "userShow":
        return <UserShow goLogout={handleLogout} />;

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
        <div className="text-center">
          <img
            src={loginlog}
            alt="Authentication illustration"
            className="w-[300px] mx-auto"
          />

          <h1 className="text-4xl font-bold text-white mt-6">Welcome Back</h1>

          <p className="text-white/80 mt-3 text-lg">
            Secure authentication system for your project
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-[430px] bg-white p-8 rounded-2xl shadow-xl">
          {renderActiveForm()}
        </div>
      </div>
    </div>
  );
}
