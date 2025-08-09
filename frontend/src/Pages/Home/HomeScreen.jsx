import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContentStore } from "../../store/content";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import MovieSlider from "../../components/MovieSlider";

const HomeScreen = () => {
  const { contentType } = useContentStore();
  const [trending, setTrending] = useState({});

  // getTrending => movie or tv
  useEffect(() => {
    const getTrending = async () => {
      const response = await axios.get(`/api/v1/${contentType}/trending`);
      setTrending(response.data.content);
    };
    getTrending();
  }, [contentType]);

  return (
    <>
      {/* Header-start */}
      <header className="relative h-screen  bg-linear-to-b from-black/70 via-black/60 to-black/60   ">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src={ORIGINAL_IMG_BASE_URL + trending.backdrop_path}
          alt="trending-img"
        />
        <Navbar />

        {/* trending-content-start */}
        <div className="h-[80%] text-white space-y-5 flex flex-col justify-center pl-[10%]  ">
          <h1 className="text-4xl md:text-6xl font-bold max-w-xl">
            {trending.name || trending.title}
          </h1>
          <p className="font-bold">
            {trending?.release_date?.split("-")[0] ||
              trending?.first_air_date?.split("-")[0]}{" "}
            | {trending?.adult ? +18 : "PG - 13"}
          </p>
          <p className="max-w-lg ">
            {trending?.overview?.length > 200
              ? trending?.overview?.slice(0, 150) + "..."
              : trending?.overview}
          </p>
          <div className="flex space-x-2">
            <Link
              className="flex  px-4 py-2  bg-white text-black rounded-md gap-3   "
              to={`/watch/${trending.id}`}
            >
              <Play className="fill-black" /> Play
            </Link>
            <Link
              className="flex px-4 py-2 bg-gray-500 rounded-md gap-3 "
              to={`/watch/${trending.id}`}
            >
              <Info /> More Info
            </Link>
          </div>
        </div>
        {/* trending-content-end */}
      </header>
      {/* Header-end */}

      {/* Content-ByCategry-start */}
      <section className=" bg-black py-10 space-y-5">
        {contentType == "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </section>
      {/* Content-ByCategry-end */}
    </>
  );
};
export default HomeScreen;
