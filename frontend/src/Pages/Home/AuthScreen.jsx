import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };
  return (
    <>
      {/* Header-start */}
      <header className="relative h-screen bg-linear-to-b from-black/70 via-black/60 to-black/60 text-white">
        <img
          className="absolute top-0 left-0 w-full h-full -z-10"
          src="/assets/hero.png"
          alt="hero-img"
        />

        {/* Nav-start */}
        <nav className="flex justify-around items-center pt-5">
          <img
            className="w-44 object-cover"
            src="/assets/netflix-logo.png"
            alt="logo"
          />
          <Link
            className="px-4 py-2 text-md bg-red-500 rounded-lg"
            to={"/login"}
          >
            Sign In
          </Link>
        </nav>
        {/* Nav-start */}

        {/* div-start */}

        <div className="h-[90%] flex flex-col items-center justify-center space-y-5">
          <h1 className="text-2xl md:text-5xl font-bold text-center">
            Unlimited Movies, TV shows, and more.
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-center">
            Watch Anywhere, Cancel Anytime.{" "}
          </h2>
          <p className="text-sm md:text-lg font-bold text-center ">
            Ready To Watch? Enter Your Email To Create Or Restart Your
            Membership.{" "}
          </p>

          <form
            onSubmit={handleFormSubmit}
            className="space-y-2  gap-2 flex flex-col sm:flex-row"
          >
            <input
              className=" h-[2.5em] w-[15em] md:w-[20em] pl-2 bg-black border-[0.02em] border-gray-600 outline-none  rounded-md"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            <button className="flex bg-red-500 h-[2.5em] md:py-5 px-2 items-center rounded">
              Get Started
              <ChevronRight />
            </button>
          </form>
        </div>

        {/* div-end */}
      </header>
      {/* Header-end */}

      {/* Seperator */}
      <div className="bg-[#232323] h-1.5"></div>

      {/* 1st-sec-start */}
      <section className="flex flex-col md:flex-row justify-around items-center bg-black text-white py-10">
        <div className="space-y-5 flex flex-col justify-center">
          <h1 className="text-3xl text-center md:text-5xl font-bold">
            Enjoy on your TV
          </h1>
          <p className="px-2 text-sm text-center md:text-start md:text-md font-bold ">
            Watch on smart TVs, Playstation, Xbox,
            <br />
            Chromecast, Apple Tv, Blu-ray Players, and more.
          </p>
        </div>

        <div className="relative w-[25em] md:w-[30em]">
          <img className=" relative z-20" src="/assets/tv.png" alt="tv-img" />
          <video
            className=" w-[20em] md:w-[22em] absolute top-15 left-12 md:top-18 md:left-15  z-10"
            controls
            autoPlay={true}
            muted
            loop
          >
            <source src="/assets/hero-vid.mp4" />
          </video>
        </div>
      </section>
      {/* 1st-sec-end */}

      {/* Seperator */}
      <div className="bg-[#232323] h-1.5"></div>

      {/* 2nd-sec-start */}
      <section className="flex flex-col md:flex-row justify-around items-center bg-black text-white py-8 md:py-0 ">
        <div className="relative pb-[5%]">
          <div className="relative">
            <img
              className="relative w-[30em] md:w-full"
              src="/assets/stranger-things-lg.png"
              alt="stranger-lg-img"
            />
          </div>
          <div className=" hidden absolute lg:flex gap-5 top-8/12 left-2/12 md:left-1/4 px-12 py-3 bg-black border-[0.02em] border-gray-500 rounded">
            <div>
              <img
                className="w-10"
                src="/assets/stranger-things-sm.png"
                alt="stranger-sm-img"
              />
            </div>
            <div>
              <h3>Stranger Things</h3>
              <h4>Downloading...</h4>
            </div>
            <div>
              <img
                className="w-10"
                src="/assets/download-icon.gif"
                alt="download-icon"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-center md:text-start text-3xl md:text-5xl font-bold">
            Download your shows
          </h1>
          <h1 className="text-center md:text-start text-3xl md:text-5xl font-bold">
            to watch offline
          </h1>
          <p className=" px-2 text-center md:text-start text-sm  font-bold max-w-sm">
            Save your favorites easily and always have something to watch.
          </p>
        </div>
      </section>
      {/* 2nd-sec-end */}

      {/* Seperator */}
      <div className="bg-[#232323] h-1.5"></div>

      {/* 3rd-sec-start */}
      <section className="flex flex-col md:flex-row justify-around items-center bg-black text-white py-8">
        <div className="space-y-5">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Watch everywhere
          </h1>
          <p className="px-5 md:px-2 text-center md:text-start text-sm  md:text-md font-bold">
            Stream unlimited movies and TV shows on your phone,
            <br />
            tablet, laptop, and TV.
          </p>
        </div>

        <div className="relative w-[25em] md:w-[40em] ">
          <img
            className="w-[25em] md:w-fit relative z-20"
            src="/assets/device-pile.png"
            alt="device-img"
          />
          <video
            className=" w-[15.5em] md:w-[60%] absolute top-8  left-20 md:top-15 md:left-28  z-10"
            controls
            autoPlay={true}
            muted
            loop
          >
            <source src="/assets/video-devices.mp4" />
          </video>
        </div>
      </section>
      {/* 3rd-sec-end */}

      {/* Seperator */}
      <div className="bg-[#232323] h-1.5"></div>

      {/* 4th-sec-start */}
      <section className="flex flex-col md:flex-row justify-around items-center bg-black text-white py-8 ">
        <div>
          <img src="/assets/kids.png" alt="kids-img" />
        </div>
        <div className="space-y-5">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Create profile for kids
          </h1>
          <p className="px-5 md:px-2 text-center md:text-start text-sm md:text-md font-bold max-w-lg">
            Send kids on adventures with their favorite character in a space
            made just for them free with your memberships .
          </p>
        </div>
      </section>
      {/* 4th-sec-end */}

      {/* Seperator */}
      <div className="bg-[#232323] h-1.5"></div>
    </>
  );
};
export default AuthScreen;
