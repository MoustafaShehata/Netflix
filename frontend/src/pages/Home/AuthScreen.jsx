import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=` + email);
  };

  return (
    <>
      <div className="text-white ">
        {/* Header-start */}
        <header className="relative h-screen bg-linear-to-b from-black/80 via-black/60 to-black/50">
          <img
            loading="lazy"
            className="absolute top-0 left-0 h-full w-full object-cover -z-10"
            src="/assets/hero.png"
            alt="main-img"
          />

          {/* Nav-start */}
          <nav className="flex justify-around items-center pt-4">
            <img
              loading="lazy"
              className="w-44"
              src="/assets/netflix-logo.png"
              alt="logo-img"
            />
            <Link
              className="bg-red-500 px-4 py-2 h-fit flex items-center rounded text-white"
              to={"/login"}
            >
              Sign In
            </Link>
          </nav>
          {/* Nav-end */}

          {/* content-start */}
          <div className="flex flex-col justify-center items-center h-8/12 mt-[5em] space-y-10 px-4">
            <h2 className="text-2xl md:text-5xl text-center font-bold">
              Unlimited Movies ,TV shows ,and more.{" "}
            </h2>
            <h4 className="text-lg md:text-2xl text-center font-bold">
              Watch anywhere ,Cancel anytime
            </h4>
            <h6 className="text-sm md:text-lg text-center font-bold">
              Ready to watch? Enter your email to create or restart your
              memberships.
            </h6>
            <form
              onSubmit={handleFormSubmit}
              className="space-x-4 space-y-5 flex flex-col md:flex-row"
            >
              <input
                className="bg-black border border-gray-500 w-[12em] md:w-[20em]  rounded py-2 px-4 focus:outline-none"
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-red-500 px-2 py-2 md:px-4 h-fit w-[12em] md:w-fit rounded"
                type="submit"
              >
                Get Started <ChevronRight className="inline" />
              </button>
            </form>
          </div>
          {/* content-end */}
        </header>
        {/* Header-end */}

        {/* break */}
        <hr className="border-3 border-neutral-700 " />

        {/* Sec-one-start */}
        <section className="flex flex-col lg:flex-row justify-around items-center py-[4em]  bg-black ">
          {/* Content-start */}
          <div className=" text-center lg:text-start px-2">
            <h3 className="text-3xl md:text-4xl font-bold ">
              Enjoy on your TV
            </h3>
            <p className="pt-8 text-sm md:text-lg font-bold">
              Watch on smart TVs, Playstation, Xbox, <br /> Chromecast, Apple
              Tv, Blu-ray Players, and more.
            </p>
          </div>
          {/* Content-end */}

          {/* img-start */}
          <div className="relative flex justify-center w-[20em] md:w-[25em] h-[20em]  ">
            <img
              loading="lazy"
              className="absolute  md:w-[26em] md:h-full h-11/12  top-0 left-0 z-20 "
              src="/assets/tv.png"
              alt="tv-img"
            />
            <video
              className="absolute md:w-[20em] w-[16em] md:h-[35em] h-full md:left-13 md:-bottom-28 left-10 bottom-5 z-10"
              autoPlay
              muted
              loop
            >
              <source src="/assets/hero-vid.mp4" />
            </video>
          </div>
          {/* img-end */}
        </section>
        {/* Sec-one-end */}

        {/* break */}
        <hr className="border-3 border-neutral-700 " />

        {/* Sec-two-start */}
        <section className="flex flex-col lg:flex-row justify-around items-center py-[2em]   bg-black ">
          {/* img-start */}
          <div className="relative w-[20em] space-y-10">
            <img
              loading="lazy"
              className="h-[20em] md:h-[25em] object-cover"
              src="/assets/stranger-things-lg.png"
              alt="stranger-main-img"
            />
            <div className="absolute flex justify-around items-center py-2 bg-black border-2 border-neutral-500 rounded mx-4 w-[20em] md:w-[25em] -left-[1em] md:-left-[4em]  bottom-1/12 ">
              <img
                loading="lazy"
                className="h-[4em] rounded "
                src="/assets/stranger-things-sm.png"
                alt="stranger-sm-img"
              />
              <h5>
                Starnger Things <br />{" "}
                <b className="text-blue-700">Downloading...</b>
              </h5>

              <img
                loading="lazy"
                className="w-12 object-cover"
                src="/assets/download-icon.gif"
                alt="download-icon"
              />
            </div>
          </div>
          {/* img-end */}

          {/* Content-start */}
          <div className=" mt-10 text-center lg:text-start px-2">
            <h3 className="text-3xl md:text-4xl font-bold ">
              Download your shows <br /> to watch offline
            </h3>
            <p className="max-w-sm pt-8 text-sm md:text-lg font-bold">
              Save your favorites easily and always have something to watch
            </p>
          </div>
          {/* Content-end */}
        </section>
        {/* Sec-two-end */}

        {/* break */}
        <hr className="border-3 border-neutral-700 " />

        {/* Sec-three-start */}
        <section className="flex flex-col lg:flex-row justify-around items-center py-[4em] space-y-[4em]  bg-black ">
          {/* Content-start */}
          <div className=" text-center lg:text-start px-2">
            <h3 className="text-3xl md:text-4xl font-bold ">
              Watch everywhere
            </h3>
            <p className="pt-8 text-sm md:text-lg font-bold">
              Stream unlimited movies and TV shows on your phone, <br />
              tablet, laptop, and TV.
            </p>
          </div>
          {/* Content-end */}

          {/* img-start */}
          <div className="relative flex justify-center w-[20em] md:w-[25em] h-[20em]  ">
            <img
              loading="lazy"
              src="/assets/device-pile.png"
              alt="device-img"
            />
            <video className="absolute w-[15em] top-8 z-10" autoPlay muted loop>
              <source src="/assets/video-devices.mp4" />
            </video>
          </div>
          {/* img-end */}
        </section>
        {/* Sec-three-end */}

        {/* break */}
        <hr className="border-3 border-neutral-700 " />

        {/* Sec-four-start */}
        <section className="flex flex-col lg:flex-row justify-around items-center py-[4em] space-y-[4em]  bg-black ">
          {/* img-start */}
          <div className="relative flex justify-center w-[20em] md:w-[25em] h-[20em]  ">
            <img loading="lazy" src="/assets/kids.png" alt="kids-img" />
          </div>
          {/* img-end */}

          {/* Content-start */}
          <div className=" text-center lg:text-start px-2">
            <h3 className="text-3xl md:text-4xl font-bold ">
              Create profiles for kids
            </h3>
            <p className="pt-8 text-sm md:text-lg font-bold">
              Send Kids on adventures with their favorite characters in a space{" "}
              <br /> made just for them free with your membership.
            </p>
          </div>
          {/* Content-end */}
        </section>
        {/* Sec-four-end */}

        {/* break */}
        <hr className="border-3 border-neutral-700 " />
      </div>

      {/* Footer-start */}
      <Footer />
      {/* Footer-end */}
    </>
  );
};
export default AuthScreen;
