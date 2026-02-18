import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { useAuthStore } from "../../store/userAuth";
import { useGetMoviesStore } from "../../store/getMovies";
import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import {
  movieCategories,
  tvCategories,
  orignalTMDBImg,
} from "../../store/constants";
import MovieSlider from "../../components/MovieSlider";
import Skeleton from "react-loading-skeleton";
import HomeScreenSkeleton from "../../components/skeletons/HomeScreenSkeleton";

const HomeScreen = () => {
  const { type, getTrendingMovie, trendingMovie, isTrendingMovieLoading } =
    useGetMoviesStore();

  useEffect(() => {
    getTrendingMovie(type);
  }, [type]);

  if (isTrendingMovieLoading) {
    return (
      <>
        <HomeScreenSkeleton />
      </>
    );
  }

  return (
    <>
      {/* header-start */}
      <header className="  relative h-screen text-white bg-linear-to-b from-black/90 via-black/60 to-black/50">
        {/* nav-start */}
        <Nav />
        {/* nav-end */}

        <img
          loading="lazy"
          className=" absolute top-0 left-0 w-full h-full object-cover -z-10"
          src={`${orignalTMDBImg}/${trendingMovie?.backdrop_path}`}
          alt="trending-img"
        />

        {/* Conetent-start */}
        <div className=" h-10/12 flex flex-col justify-center  md:px-[10em] px-[2em] space-y-6 ">
          <h1 className="text-4xl font-bold">
            {trendingMovie?.name || trendingMovie?.title}
          </h1>
          <h3 className="font-bold">
            {trendingMovie?.release_date?.slice(0, 4) ||
              trendingMovie?.first_air_date?.slice(0, 4)}
            {"  "}| {trendingMovie?.adult ? "adult" : "PG-13"}
          </h3>
          <p className="max-w-xl">
            {trendingMovie?.overview?.length > 150
              ? trendingMovie?.overview.slice(0, 150) + "..."
              : trendingMovie?.overview}
          </p>
          <div className="space-x-4 flex">
            <Link
              to={`/movie-details?type=${type}&id=${trendingMovie?.id}`}
              className="flex gap-2 bg-white text-black px-4 py-2 rounded"
            >
              <Play fill="black" />
              Play
            </Link>
            <Link
              to={`/movie-details?type=${type}&id=${trendingMovie?.id}`}
              className="flex gap-2 bg-gray-700 px-4 py-2 rounded"
            >
              <Info />
              More Info
            </Link>
          </div>
        </div>
        {/* Conetent-end */}
      </header>
      {/* header-end */}

      {/* Section-start */}
      <section className="min-h-screen bg-black text-white">
        {type == "movie"
          ? movieCategories.map((category, index) => (
              <MovieSlider key={index} type={type} category={category} />
            ))
          : tvCategories.map((category, index) => (
              <MovieSlider key={index} type={type} category={category} />
            ))}
      </section>
      {/* Section-end */}
    </>
  );
};
export default HomeScreen;
