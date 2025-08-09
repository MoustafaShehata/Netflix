import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section className="h-screen relative bg-linear-to-b  from-black/85 via-black/60 to-black/60">
        <img
          className="absolute top-0 left-0 w-full h-full -z-10 object-cover"
          src="/assets/404.png"
          alt="404-img"
        />
        {/* Header-start */}
        <header className="max-w-6xl mx-auto px-5  pt-5">
          <img className="w-44" src="/assets/netflix-logo.png" alt="logo" />
        </header>
        {/* Header-end */}

        <div className="h-[85%] flex flex-col justify-center items-center text-white space-y-8">
          <h1 className="text-center text-3xl md:text-5xl font-bold">
            Lost Your Way?
          </h1>
          <p className="text-center text-sm md:text-lg font-bold">
            Sorry we can't find that page. you 'll find lots to explore on the
            home page.{" "}
          </p>
          <Link to={"/"} className="px-4 py-2 bg-white text-black rounded">
            Netflix Home
          </Link>
        </div>
      </section>
    </>
  );
};
export default NotFoundPage;
