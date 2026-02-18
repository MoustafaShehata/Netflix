import { useState } from "react";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/userAuth";

const SignupPage = () => {
  const { searchParams } = new URL(document.location);
  const emailAuthValue = searchParams.get("email");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("" || emailAuthValue);
  const [password, setPassword] = useState("");
  const { signup, isSigningUp, isExistingUser } = useAuthStore();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup({ email, name, password });

    if (
      emailRegex.test(email) &&
      name &&
      password.length >= 6 &&
      result.success
    ) {
      navigate("/verifyemail");
    }
    console.log(isExistingUser);
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

        {/* SignUp-form-start */}
        <div className="h-9/12   mt-16 text-white flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-black/70 px-2 sm:px-10 py-4 rounded-2xl space-y-6"
          >
            <h3 className="text-center text-3xl font-bold">Sign Up</h3>
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
              <label htmlFor="name">Username</label>
              <br />
              <input
                className="mt-1 border-2 border-gray-600 outline-none px-2 py-1 w-[20em] rounded"
                id="name"
                type="text"
                placeholder="moustafa"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <button
              className="mt-1 bg-red-600 p-2  w-[20em] rounded cursor-pointer "
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? "SigningUp..." : "Sign Up"}
            </button>
            <h4 className="text-center">
              Already a member ?{" "}
              <Link to={"/login"} className="text-red-500">
                Sign in
              </Link>
            </h4>
          </form>
        </div>
        {/* SignUp-form-end */}
      </div>
      {/* header-end */}

      {/* Footer-start */}
      <Footer />
      {/* Footer-end */}
    </>
  );
};
export default SignupPage;
