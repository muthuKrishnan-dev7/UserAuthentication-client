import { useEffect, useRef, useState } from "react";
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
  const inputRefs = useRef([]);

  useEffect(() => {
    alert(
      "Your OTP: " +
        localStorage.getItem("otp") +
        "\nYou can also see your OTP on Console.",
    );
    console.log(localStorage.getItem("otp"));

    inputRefs.current[0]?.focus();

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

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // digits mattum

    setOtpData({
      ...otpData,
      [e.target.name]: value,
    });

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpData[e.target.name] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
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
        {Object.keys(otpData).map((key, index) => (
          <input
            key={key}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength="1"
            name={key}
            value={otpData[key]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
