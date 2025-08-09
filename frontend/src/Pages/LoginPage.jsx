import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <>
      <div className="h-screen relative bg-linear-to-b from-black/90 via-black/25 to-transparent">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover -z-10"
          src="/assets/hero.png"
          alt="hero-img"
        />
        {/* Header-start */}
        <header className=" px-5  pt-5 max-w-6xl md:mx-auto">
          <img className="w-44" src="/assets/netflix-logo.png" alt="logo-img" />
        </header>
        {/* Header-end */}

        {/* Login-start */}
        <div className="w-full h-[85%] flex justify-center items-center ">
          <div className=" h-fit flex flex-col items-center  py-10 px-4 sm:p-10 bg-black/80  text-white rounded-2xl">
            <h1 className="text-3xl font-bold pb-4">Login</h1>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="pl-2 mt-1 h-[2.5em] w-[20em]  border-[0.02em] border-gray-600 outline-none rounded-md"
                  type="text"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  className="pl-2 mt-1 h-[2.5em] w-[20em]  border-[0.02em] border-gray-600 outline-none rounded-md"
                  type="password"
                  id="password"
                  placeholder="***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
              </div>

              <button
                className=" h-[2.5em] w-[20em] bg-red-600 text-center 
              cursor-pointer
              rounded-md "
              >
                Login
              </button>
              <h3 className="text-center">
                Dont have an account ?{" "}
                <Link className="text-red-600" to={"/signup"}>
                  sign up
                </Link>
              </h3>
            </form>
          </div>
        </div>
        {/* Login-end */}
      </div>
    </>
  );
};
export default Login;
