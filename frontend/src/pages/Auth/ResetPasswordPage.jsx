import { useState } from "react";
import Footer from "../../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/userAuth";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isresetingPassword, resetPassword } = useAuthStore();
  const navigate = useNavigate();

  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    resetPassword({ token, password, confirmPassword });
    if (password.length >= 6 && password == confirmPassword) {
      navigate("/login");
    }
  };

  return (
    <>
      {/* header-start */}
      <div className="h-screen relative bg-linear-to-b from-black/80 via-black/50 to-black/40">
        <img
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/assets/hero.png"
          alt="main-img"
        />

        {/* Nav-start */}
        <div className="max-w-6xl mx-auto ">
          <img
            loading="lazy"
            className="w-44 pt-4 px-4 "
            src="/assets/netflix-logo.png"
            alt="logo-img"
          />
        </div>
        {/* Nav-end */}

        {/* ResetPassword-form-start */}
        <div className="h-9/12   mt-16 text-white flex justify-center items-center">
          <form
            onSubmit={handleFormSubmit}
            className="bg-black/70 px-2 sm:px-10 py-4 rounded-2xl space-y-6"
          >
            <h3 className="text-center text-3xl font-bold">Reset Password</h3>

            <div>
              <label htmlFor="New Password">New Password</label>
              <br />
              <input
                className="mt-1 border-2 border-gray-600 outline-none px-2 py-1 w-[20em] rounded"
                id="New Password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="Confirm New Password">Confirm New Password</label>
              <br />
              <input
                className="mt-1 border-2 border-gray-600 outline-none px-2 py-1 w-[20em] rounded"
                id="Confirm New Password"
                type="password"
                placeholder="******"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="mt-1 bg-red-600 p-2  w-[20em] rounded cursor-pointer "
              type="submit"
              disabled={isresetingPassword}
            >
              {isresetingPassword
                ? "resetingPassword..."
                : "Reset Your Password"}
            </button>
          </form>
        </div>
        {/* ResetPassword-form-end */}
      </div>
      {/* header-end */}

      {/* Footer-start */}
      <Footer />
      {/* Footer-end */}
    </>
  );
};
export default ResetPasswordPage;
