import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  return (
    <>
      {/* header-start */}
      <div className="relative h-screen bg-linear-to-b from-black/90 via-black/50 to-black/40 text-white">
        <img
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full  object-cover -z-10"
          src="/assets/404.png"
          alt="notfound-img"
        />

        {/* nav-start */}
        <div className="max-w-6xl mx-auto ">
          <img
            loading="lazy"
            className="w-44 px-4 pt-4"
            src="/assets/netflix-logo.png"
            alt="logo-img"
          />
        </div>
        {/* nav-end */}

        {/* content-start */}
        <div className="h-9/12  flex flex-col space-y-5 justify-center items-center">
          <h2 className="font-bold text-3xl md:text-5xl">Lost Your Way ?</h2>
          <h4 className="text-lg text-center">
            Sorry we can't find that page. you 'll find lots to explore on the
            home page.
          </h4>
          <Link to={"/"} className="p-2 bg-white text-black rounded">
            Netflix Home
          </Link>
        </div>
        {/* content-end */}
      </div>
      {/* header-end */}

      <Footer />
    </>
  );
};
export default NotFoundPage;
