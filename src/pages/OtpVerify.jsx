import { useEffect, useState } from "react";
import { otpVerify } from "../Service/api/api";

export default function OtpVerify({ goLogin, goUserShow }) {
  const [otpData, setOtpData] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const [timer, setTimer] = useState(180);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const OTP = Object.values(otpData).join("");
    const email = localStorage.getItem("email");
    try {
      const response = await otpVerify(email, OTP);
      console.log("Otp Verification Done:", response);
      localStorage.removeItem("email");
      localStorage.setItem("token", response.token);
      goUserShow();
      // === want to go to the user page ===
    } catch (error) {
      console.log(error);
      alert("Register Failed. Try again");
      goLogin();
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>

      <div className="flex gap-2 justify-center mb-4">
        {Object.keys(otpData).map((key) => (
          <input
            key={key}
            maxLength="1"
            name={key}
            value={otpData[key]}
            onChange={handleChange}
            className="w-12 h-12 border text-center rounded-lg"
          />
        ))}
      </div>

      <p className="text-center mb-4">
        OTP Valid: {Math.floor(timer / 60)}:
        {(timer % 60).toString().padStart(2, "0")}
      </p>

      <button
        type="submit"
        className="w-full bg-cyan-400 py-3 rounded-lg font-bold"
      >
        Verify OTP
      </button>
    </form>
  );
}
