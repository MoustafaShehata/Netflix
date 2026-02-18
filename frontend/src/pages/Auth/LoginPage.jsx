import { useState } from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/userAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogging, login } = useAuthStore();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
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
        <div className="max-w-6xl mx-auto  ">
          <img
            loading="lazy"
            className="w-44 pt-4 px-4 "
            src="/assets/netflix-logo.png"
            alt="logo-img"
          />
        </div>
        {/* Nav-end */}

        {/* Login-form-start */}
        <div className="h-9/12   mt-16 text-white flex justify-center items-center">
          <form
            onSubmit={handleFormSubmit}
            className="bg-black/70 px-2 sm:px-10 py-4 rounded-2xl space-y-6"
          >
            <h3 className="text-center text-3xl font-bold">Login</h3>
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

            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                className="mt-1 border-2 border-gray-600 outline-none px-2 py-1 w-[20em] rounded"
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link
              className="block text-gray-200 text-sm"
              to={"/forgot-password"}
            >
              Forgot password ?
            </Link>
            <button
              className=" bg-red-600 p-2  w-[20em] rounded cursor-pointer "
              type="submit"
              disabled={isLogging}
            >
              {isLogging ? "logging..." : "Login"}
            </button>
            <h4 className="text-center">
              Don't have an account ?{" "}
              <Link to={"/signup"} className="text-red-500">
                Sign up
              </Link>
            </h4>
          </form>
        </div>
        {/* Login-form-end */}
      </div>
      {/* header-end */}

      {/* Footer-start */}
      <Footer />
      {/* Footer-end */}
    </>
  );
};
export default LoginPage;
