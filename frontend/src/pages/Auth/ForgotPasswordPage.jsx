import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { MoveLeftIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/userAuth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { sendingResetLink, forgotPassword } = useAuthStore();

  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
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

        {/* ForgotPassword-form-start */}
        <div className="h-9/12   mt-16 text-white flex justify-center items-center">
          <form
            onSubmit={handleFormSubmit}
            className="bg-black/70 px-2 sm:px-10 py-4 rounded-2xl space-y-6"
          >
            <h3 className="text-center text-3xl font-bold">Forgot Password</h3>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                className="mt-1 border-2 border-gray-600 outline-none px-2 py-1 w-[20em] rounded"
                id="email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="mt-1 bg-red-600 p-2  w-[20em] rounded cursor-pointer "
              type="submit"
              disabled={sendingResetLink}
            >
              {sendingResetLink ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center space-x-2">
              <MoveLeftIcon className="inline" size={15} />{" "}
              <Link to={"/login"}>Back to login</Link>
            </div>
          </form>
        </div>
        {/* ForgotPassword-form-end */}
      </div>
      {/* header-end */}

      {/* Footer-start */}
      <Footer />
      {/* Footer-end */}
    </>
  );
};
export default ForgotPasswordPage;
