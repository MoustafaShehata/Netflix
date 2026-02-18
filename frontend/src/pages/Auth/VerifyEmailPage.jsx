import { useRef, useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/userAuth";

const VerifyEmailPage = () => {
  const [verificationCodeBtns, setverificationCodeBtns] = useState(
    Array(6).fill(""),
  );
  const [verificationCode, setverificationCode] = useState("");
  const inputsRef = useRef([]);
  const { isVerifingEmail, verifyEmail } = useAuthStore();

  // handleChange
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newverificationCodeBtns = [...verificationCodeBtns];
    newverificationCodeBtns[index] = value;
    setverificationCodeBtns(newverificationCodeBtns);
    setverificationCode(newverificationCodeBtns.join(""));
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handleKeyDown
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !verificationCodeBtns[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // handlePaste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6);
    const updatedverificationCodeBtns = Array(6).fill("");
    digits
      .split("")
      .forEach((digit, index) => (updatedverificationCodeBtns[index] = digit));
    setverificationCodeBtns(updatedverificationCodeBtns);
    setverificationCode(updatedverificationCodeBtns.join(""));
  };

  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    verifyEmail({ verificationCode });
  };

  return (
    <>
      <div className="h-screen relative bg-linear-to-b from-black/80 via-black/50 to-black/40">
        <img
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/assets/hero.png"
          alt="main-img"
        />

        <div className="max-w-6xl mx-auto ">
          <img
            loading="lazy"
            className="w-44 pt-4 px-4"
            src="/assets/netflix-logo.png"
            alt="logo-img"
          />
        </div>

        <div className="h-9/12 mt-16 text-white flex justify-center items-center">
          <form
            onSubmit={handleFormSubmit}
            className="bg-black/70 px-6 sm:px-10 py-6 rounded-2xl space-y-6"
          >
            <h3 className="text-center text-3xl font-bold">
              Verify Your Email
            </h3>

            <h2 className="text-center">
              Enter the 6 digit code sent to your email address
            </h2>

            <div className="flex justify-around" onPaste={handlePaste}>
              {verificationCodeBtns.map((digit, index) => (
                <input
                  type="text"
                  key={index}
                  value={digit}
                  maxLength={1}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 bg-gray-600 border border-gray-400 focus:outline-none focus:border-red-500 text-center text-2xl"
                />
              ))}
            </div>

            <button
              className="bg-red-600 p-2 w-full rounded cursor-pointer hover:bg-red-700 transition disabled:opacity-50"
              type="submit"
              disabled={isVerifingEmail}
            >
              {isVerifingEmail ? "verifingEmail" : "Verify Email"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VerifyEmailPage;
